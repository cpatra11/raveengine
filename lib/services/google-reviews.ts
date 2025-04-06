import { google } from "googleapis";
import { googleConfig } from "@/config/google";
import { prisma } from "@/lib/prisma";

const oauth2Client = new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirectUri
);

const mybusinessbusinessinformation =
  google.mybusinessbusinessinformation("v1");

export async function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: googleConfig.scopes,
    prompt: "consent",
  });
}

export async function handleGoogleCallback(code: string, userId: string) {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Store tokens in the Account model
    await prisma.account.create({
      data: {
        userId,
        type: "oauth",
        provider: "google",
        providerAccountId: tokens.id_token || "",
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: tokens.expiry_date
          ? Math.floor(tokens.expiry_date / 1000)
          : undefined,
        token_type: tokens.token_type,
        scope: tokens.scope,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Google OAuth error:", error);
    return { error: "Failed to authenticate with Google" };
  }
}

export async function fetchGoogleReviews(userId: string) {
  try {
    // Get user's Google account
    const account = await prisma.account.findFirst({
      where: {
        userId,
        provider: "google",
      },
    });

    if (!account?.access_token) {
      return { error: "No Google account connected" };
    }

    oauth2Client.setCredentials({
      access_token: account.access_token,
      refresh_token: account.refresh_token,
    });

    // List all locations
    const { data: locationList } =
      await mybusinessbusinessinformation.accounts.locations.list({
        parent: "accounts/-", // List all available accounts
        auth: oauth2Client,
      });

    const reviews: any[] = [];

    // Fetch reviews for each location
    if (locationList.locations) {
      for (const location of locationList.locations) {
        const { data: reviewsData } =
          await mybusinessbusinessinformation.accounts.locations.reviews.list({
            parent: location.name,
            auth: oauth2Client,
          });

        if (reviewsData.reviews) {
          reviews.push(...reviewsData.reviews);
        }
      }
    }

    // Save reviews to database
    for (const review of reviews) {
      await prisma.testimonial.create({
        data: {
          userId,
          name: review.reviewer.displayName || "Anonymous",
          rating: review.starRating || null,
          text: review.comment || "",
          source: "google",
          metadata: {
            reviewId: review.reviewId,
            locationName: review.locationName,
            createTime: review.createTime,
            updateTime: review.updateTime,
          },
        },
      });
    }

    return {
      success: true,
      message: `Successfully imported ${reviews.length} reviews`,
    };
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return { error: "Failed to fetch Google reviews" };
  }
}
