"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const { isAuthenticated, isLoading, restoreSession } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Only call restoreSession if we are loading and haven't authenticated yet
    // Actually, just calling restoreSession once on mount is standard pattern for persistent auth
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    // If we're not loading and not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Sidebar */}
      <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <TopBar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
