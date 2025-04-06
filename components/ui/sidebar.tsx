import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquareQuote,
  FileOutput,
  BarChart3,
  Settings,
} from "lucide-react";
import Image from "next/image";

const navigationItems = [
  { icon: LayoutDashboard, title: "Dashboard", isActive: true },
  { icon: MessageSquareQuote, title: "Testimonials" },
  { icon: FileOutput, title: "Generated" },
  { icon: BarChart3, title: "Analytics" },
];

const Sidebar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-24 items-center py-6 z-50 ">
        <div className="flex flex-col items-center h-full w-full">
          {/* Logo */}
          <Image src="/logo2.png" alt="Logo" width={50} height={50} />

          {/* Navigation Icons */}
          <div className="flex-1 flex items-center">
            <nav className="flex flex-col items-center space-y-6">
              {navigationItems.map((item) => (
                <Button
                  key={item.title}
                  variant="ghost"
                  className={cn(
                    "w-12 h-12 rounded-lg p-0 flex items-center justify-center",
                    "hover:bg-gray-200 hover:cursor-pointer transition-all duration-400",
                    "active:scale-95",
                    "relative",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "data-[state=active]:bg-gray-200"
                  )}
                  data-state={item.isActive ? "active" : undefined}
                  title={item.title}
                >
                  <item.icon className="h-6 w-6" />
                </Button>
              ))}
            </nav>
          </div>

          {/* Settings Button */}
          <Button
            variant="ghost"
            className={cn(
              "w-12 h-12 rounded-lg p-0 flex items-center justify-center",
              "hover:bg-gray-200 hover:cursor-pointer transition-all duration-400",
              "active:scale-95",
              "mt-8"
            )}
            title="Settings"
          >
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-5 h-full">
          {navigationItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              className={cn(
                "h-full rounded-none flex flex-col items-center justify-center gap-1",
                "hover:bg-gray-100 active:scale-95",
                item.isActive && "text-blue-600"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-[10px]">{item.title}</span>
            </Button>
          ))}
          <Button
            variant="ghost"
            className="h-full rounded-none flex flex-col items-center justify-center gap-1 hover:bg-gray-100"
          >
            <Settings className="h-6 w-6" />
            <span className="text-[10px]">Settings</span>
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
