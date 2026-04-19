'use client';

import { useAuthStore } from "@/lib/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthLoading, restoreSession } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // On mount, restore session if needed
  useEffect(() => {
    if (!user && !isAuthLoading) {
      restoreSession();
    }
  }, []);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [user, isAuthLoading, router, pathname]);

  if (isAuthLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
        <LoadingSpinner className="h-10 w-10 text-brand-500 mb-4" />
        <div className="text-muted-foreground font-medium animate-pulse text-sm">Authenticating...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
