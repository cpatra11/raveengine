import React from "react";
import Sidebar from "@/components/ui/sidebar";
import { MobileHeader } from "@/components/ui/mobile-header";
import { auth } from "@/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <MobileHeader userEmail={session?.user?.email} />
      <main className="flex-1 overflow-y-auto md:ml-24 pt-16 md:pt-0 pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;
