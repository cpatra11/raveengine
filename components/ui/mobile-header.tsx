import React from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MobileHeaderProps {
  userEmail?: string | null;
}

export function MobileHeader({ userEmail }: MobileHeaderProps) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 px-4 flex items-center justify-between">
      <Image src="/logo2.png" alt="Logo" width={32} height={32} />

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="p-2">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
          {userEmail?.[0]?.toUpperCase() || "U"}
        </div>
      </div>
    </div>
  );
}
