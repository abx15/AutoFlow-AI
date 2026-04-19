"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, History, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { NotificationBell } from "./NotificationBell";
import { cn } from "@/lib/utils";

export function TopBar() {
  const pathname = usePathname();
  
  // Simple breadcrumb logic
  const parts = pathname.split("/").filter(Boolean);
  const title = parts[parts.length - 1] === "dashboard" 
    ? "Overview" 
    : parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1);

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-20 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="font-bold text-lg">{title}</h2>
        <div className="h-4 w-px bg-border mx-2 hidden sm:block" />
        <div className="text-xs text-muted-foreground hidden sm:block">
          Dashboard / {parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" / ")}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search workflows, executions..." 
            className="pl-9 bg-muted/50 border-none h-9 focus-visible:ring-primary/20"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <History className="w-5 h-5" />
          </Button>
          <NotificationBell />
          <div className="h-8 w-px bg-border mx-2" />
          <a href="/dashboard/workflows/new" className={cn(buttonVariants({ size: "sm" }), "gap-2")}>
            <Plus className="w-4 h-4" />
            New Workflow
          </a>
        </div>
      </div>
    </header>
  );
}
