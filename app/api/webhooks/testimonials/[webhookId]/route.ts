import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// Define schema for incoming webhook data
const testimonialWebhookSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rating: z.number().min(1).max(5).optional(),
  email: z.string().email().optional(),
  testimonial: z.string().min(1, "Testimonial text is required"),
  source: z.string().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { webhookId: string } }
) {
  try {
    const webhookId = params.webhookId;

    // Find the user by webhook ID
    const user = await prisma.user.findFirst({
      where: {
        metadata: {
          path: ["webhookId"],
          equals: webhookId,
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid webhook ID" },
        { status: 400 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validatedData = testimonialWebhookSchema.parse(body);

    // Create testimonial
    const testimonial = await prisma.testimonial.create({
      data: {
        userId: user.id,
        name: validatedData.name,
        rating: validatedData.rating,
        text: validatedData.testimonial,
        source: validatedData.source || "webhook",
        metadata: {
          email: validatedData.email,
          webhookSource: body.source || "unknown",
          originalData: body,
        },
      },
    });

    return NextResponse.json(
      { success: true, message: "Testimonial received", id: testimonial.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
