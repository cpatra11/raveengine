import React from "react";
import { auth } from "@/auth";
import { DashboardHeader } from "@/components/ui/dashboard-header";
import { StatsCard } from "@/components/ui/stats-card";
import { RecentTestimonials } from "@/components/ui/recent-testimonials";
import { ContentGenerationHub } from "@/components/ui/content-generation-hub";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      <DashboardHeader
        userName={session?.user?.name}
        userEmail={session?.user?.email}
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Testimonial Collection"
          value="48"
          trend="+6"
          description="Total testimonials gathered"
        />
        <StatsCard
          title="Content Generated"
          value="32"
          trend="+12"
          description="Assets created this month"
        />
        <StatsCard
          title="Engagement Rate"
          value="76%"
          trend="+8%"
          description="Social proof effectiveness"
        />
      </div>

      {/* Recent Testimonials */}
      <RecentTestimonials />

      {/* Content Generation Hub */}
      <ContentGenerationHub />
    </div>
  );
}
