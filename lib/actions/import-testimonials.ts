"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuthUrl, fetchGoogleReviews } from "@/lib/services/google-reviews";

// Schema for direct text input validation
const textInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rating: z.coerce.number().min(1).max(5),
  testimonial: z.string().min(1, "Testimonial text is required"),
});

// Schema for CSV upload data validation
const csvRowSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rating: z.coerce.number().min(1).max(5),
  testimonial: z.string().min(1, "Testimonial text is required"),
  date: z.string().optional(),
});

export type TextInputFormValues = z.infer<typeof textInputSchema>;
export type CSVRowData = z.infer<typeof csvRowSchema>;

// For direct text input
export async function addTestimonialFromText(formData: TextInputFormValues) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const validated = textInputSchema.parse(formData);

    await prisma.testimonial.create({
      data: {
        userId: session.user.id,
        name: validated.name,
        rating: validated.rating,
        text: validated.testimonial,
        source: "manual",
      },
    });

    revalidatePath("/import");
    return { success: "Testimonial added successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error("Add testimonial error:", error);
    return { error: "Failed to add testimonial" };
  }
}

// For CSV data processing
export async function processCSVData(
  csvData: Array<{
    name: string;
    rating: number;
    testimonial: string;
    date?: string;
  }>
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    // Validate all rows
    const validatedData = csvData.map((row) => csvRowSchema.parse(row));

    // Batch create testimonials
    await prisma.testimonial.createMany({
      data: validatedData.map((row) => ({
        userId: session.user.id,
        name: row.name,
        rating: row.rating,
        text: row.testimonial,
        date: row.date ? new Date(row.date) : new Date(),
        source: "csv",
      })),
    });

    revalidatePath("/import");
    return {
      success: `Successfully imported ${validatedData.length} testimonials`,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error("Process CSV error:", error);
    return { error: "Failed to process CSV data" };
  }
}

// For generating webhook URL
export async function generateWebhookUrl() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    // Generate a unique webhook ID using timestamp and user ID
    const webhookId = Buffer.from(`${Date.now()}-${session.user.id}`)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // Store webhook ID in metadata of user (you might want to create a separate Webhook model in a production app)
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        metadata: {
          webhookId,
        },
      },
    });

    const webhookUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/testimonials/${webhookId}`;

    return {
      success: true,
      webhookUrl,
    };
  } catch (error) {
    console.error("Generate webhook URL error:", error);
    return { error: "Failed to generate webhook URL" };
  }
}

// For Google OAuth connection
export async function startGoogleOAuth() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const authUrl = await getAuthUrl();

    return {
      success: true,
      authUrl,
    };
  } catch (error) {
    console.error("Start OAuth error:", error);
    return { error: "Failed to start OAuth flow" };
  }
}

// For fetching Google reviews
export async function importGoogleReviews() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const result = await fetchGoogleReviews(session.user.id);

    if (result.success) {
      revalidatePath("/import");
    }

    return result;
  } catch (error) {
    console.error("Import Google reviews error:", error);
    return { error: "Failed to import Google reviews" };
  }
}
