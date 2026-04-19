"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  GitBranch, 
  PlayCircle, 
  LayoutTemplate, 
  BarChart2, 
  Key, 
  Users, 
  CreditCard, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/authStore";
import { useTheme } from "next-themes";
import { ThemeToggle } from "../shared/ThemeToggle";

interface SidebarProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

const navItems = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Workflows", href: "/dashboard/workflows", icon: GitBranch },
  { name: "Executions", href: "/dashboard/executions", icon: PlayCircle },
  { name: "Templates", href: "/dashboard/templates", icon: LayoutTemplate },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { divider: true },
  { name: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar({ expanded, setExpanded }: SidebarProps) {
  const pathname = usePathname();
  const { user, org, logout } = useAuthStore();

  return (
    <aside
      className={cn(
        "h-screen flex flex-col bg-surface border-r border-border transition-all duration-300 relative z-30",
        expanded ? "w-64" : "w-20"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center px-6 gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Zap className="text-primary-foreground fill-primary-foreground w-5 h-5" />
        </div>
        {expanded && (
          <span className="font-bold tracking-tight text-lg truncate">AutoFlow AI</span>
        )}
      </div>

      {/* Nav Items */}
      <div className="flex-1 px-3 space-y-1">
        {navItems.map((item, i) => (
          item.divider ? (
            <div key={`div-${i}`} className="py-2">
              <div className="h-px bg-border/50 mx-3" />
            </div>
          ) : (
            <Link
              key={item.href!}
              href={item.href!}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative",
                pathname === item.href 
                  ? "bg-primary/10 text-primary font-bold" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0", pathname === item.href && "text-primary")} />
              {expanded && <span>{item.name}</span>}
              {!expanded && (
                <div className="absolute left-14 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border pointer-events-none">
                  {item.name}
                </div>
              )}
            </Link>
          )
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 bg-muted/30 border-t border-border">
        {expanded && (
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs shrink-0">
              {user?.name?.[0]}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold truncate">{user?.name}</div>
              <div className="text-[10px] text-muted-foreground truncate uppercase tracking-tighter">
                {org?.name} • Pro
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-around">
          <ThemeToggle />
          {expanded && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => logout()}
              className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setExpanded(!expanded)}
            className="text-muted-foreground"
          >
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>
      </div>
    </aside>
  );
}
