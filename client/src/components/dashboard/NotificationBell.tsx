"use client";

import { useState } from "react";
import { Bell, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mockNotifications = [
  { id: 1, type: "success", title: "Execution Success", message: "Workflow 'Customer Onboarding' completed successfully.", time: "2m ago", read: false },
  { id: 2, type: "error", title: "Execution Failed", message: "Workflow 'Lead Scraper' failed due to rate limit.", time: "15m ago", read: false },
  { id: 3, type: "info", title: "New Feature", message: "Claude 3.5 Sonnet is now available in the builder.", time: "1h ago", read: true },
];

export function NotificationBell() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative text-muted-foreground")}>
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background animate-pulse" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 border-border bg-popover/90 backdrop-blur-md">
        <div className="flex items-center justify-between p-4 bg-muted/50">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          <button 
            onClick={markAllRead} 
            className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest"
          >
            Mark all as read
          </button>
        </div>
        <DropdownMenuSeparator className="m-0" />
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <DropdownMenuItem 
                key={n.id} 
                className={cn(
                  "p-4 flex gap-3 cursor-pointer outline-none transition-colors",
                  !n.read ? "bg-primary/5 border-l-2 border-primary" : "opacity-60 grayscale-[0.5]"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  n.type === "success" ? "bg-green-500/10 text-green-500" :
                  n.type === "error" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
                )}>
                  {n.type === "success" ? <CheckCircle2 className="w-4 h-4" /> :
                   n.type === "error" ? <AlertCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold flex justify-between items-center mb-0.5">
                    {n.title}
                    <span className="text-[10px] font-medium text-muted-foreground">{n.time}</span>
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {n.message}
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground italic text-sm">
              No new notifications
            </div>
          )}
        </div>
        <DropdownMenuSeparator className="m-0" />
        <Button variant="ghost" className="w-full h-10 rounded-none text-xs font-bold text-muted-foreground hover:text-primary">
          View all notifications
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
