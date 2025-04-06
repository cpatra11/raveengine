import React from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  userName?: string | null;
  userEmail?: string | null;
}

export function DashboardHeader({ userName, userEmail }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome back, {userName || "User"}!
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Transform your testimonials into powerful marketing assets
        </p>
      </div>
      <div className="flex items-center space-x-4 self-end md:self-auto">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "hidden md:flex",
            "hover:bg-gray-200 hover:cursor-pointer transition-all duration-400",
            "active:scale-95"
          )}
        >
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </Button>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          {userEmail?.[0]?.toUpperCase() || &quot;U&quot;}
        </div>
      </div>
    </div>
  );
}
