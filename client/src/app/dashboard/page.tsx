"use client";

import { useEffect } from "react";
import { 
  Zap, 
  Activity, 
  Box, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock,
  Plus,
  Play,
  ArrowRight,
  ShieldCheck,
  LayoutGrid,
  Bot,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { useAuthStore } from "@/lib/store/authStore";
import { useExecutionStats } from "@/lib/api/hooks/executionHooks";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { user, org, fetchMe, isLoading: isAuthLoading } = useAuthStore();
  const { data: stats, isLoading: isStatsLoading } = useExecutionStats();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  if (isAuthLoading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-6">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <div className="text-center space-y-2">
          <h2 className="text-xl font-black uppercase tracking-widest">Waking up the Engine</h2>
          <p className="text-muted-foreground text-sm">Authenticating your session with AutoFlow AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-primary p-8 md:p-12 text-white shadow-2xl shadow-primary/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
               Welcome back, {user?.name?.split(' ')[0] || "Developer"}!
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed font-medium">
              Your organization **{org?.name || "AutoFlow AI"}** has processed {stats?.totalExecutions || 0} workflows this month.
              You're currently using **{org?.tokenUsed || 0} / {org?.tokenQuota || 100000}** tokens.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/dashboard/workflows/new">
                <Button className="bg-white text-primary hover:bg-white/90 font-black h-12 px-8 rounded-xl shadow-lg">
                  <Plus className="w-5 h-5 mr-2" /> CREATE WORKFLOW
                </Button>
              </Link>
              <Button variant="ghost" className="text-white hover:bg-white/10 font-bold h-12 px-8 rounded-xl border border-white/20">
                VIEW DOCUMENTATION
              </Button>
            </div>
          </div>
          <div className="hidden lg:block w-48 h-48 bg-white/10 rounded-full blur-3xl absolute -top-10 -right-10" />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="hidden md:flex flex-col items-center justify-center w-64 h-64 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20"
          >
            <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Platform Status</div>
            <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-white animate-spin mb-4" />
            <div className="font-mono text-xl font-black tracking-tighter">ALL SYSTEMS GO</div>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Workflows" 
          value={org?.activeWorkflows || 0} 
          change="+12%" 
          trend="up" 
          icon={Zap} 
          loading={isStatsLoading}
        />
        <StatCard 
          title="Executions (24h)" 
          value={stats?.dailyExecutions || 0} 
          change="+1.5%" 
          trend="up" 
          icon={Activity} 
          loading={isStatsLoading}
        />
        <StatCard 
          title="Success Rate" 
          value={`${stats?.successRate || 99.8}%`} 
          change="-0.2%" 
          trend="down" 
          icon={ShieldCheck} 
          loading={isStatsLoading}
        />
        <StatCard 
          title="Avg. Latency" 
          value={`${stats?.avgLatency || 142}ms`} 
          change="-18ms" 
          trend="up" 
          icon={Clock} 
          loading={isStatsLoading}
        />
      </div>

      {/* Main Grid: Charts & Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Usage Analytics */}
        <Card className="lg:col-span-2 glass border-none rounded-[2rem] overflow-hidden shadow-xl shadow-muted/20">
          <CardHeader className="p-8 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Execution Trends</CardTitle>
                <CardDescription>Visualizing your workflow volume over the last 30 days.</CardDescription>
              </div>
              <div className="flex gap-2">
                 <Badge variant="outline" className="border-none bg-primary/10 text-primary font-bold">Monthly</Badge>
                 <Badge variant="ghost" className="font-bold opacity-40">Weekly</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-10">
             <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats?.trends || mockHistory}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0f172a", border: "none", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                      itemStyle={{ color: "#3b82f6", fontWeight: "bold" }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Recent */}
        <div className="space-y-6">
           <Card className="glass border-none rounded-[2rem] shadow-xl shadow-muted/20 overflow-hidden">
             <CardHeader className="p-6">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Quick Setup</CardTitle>
             </CardHeader>
             <CardContent className="px-6 pb-6 space-y-3">
                <OnboardingItem 
                  title="Generate API Key" 
                  desc="Required to connect your SDK" 
                  done={false} 
                  link="/dashboard/api-keys" 
                />
                <OnboardingItem 
                  title="Invite Team Member" 
                  desc="Collaborate on workflows" 
                  done={true} 
                  link="/dashboard/team" 
                />
                <OnboardingItem 
                  title="Connect Integration" 
                  desc="Sync with Slack or Github" 
                  done={false} 
                  link="/dashboard/settings" 
                />
             </CardContent>
           </Card>

           <Card className="glass border-none rounded-[2rem] shadow-xl shadow-muted/20 p-6 bg-primary/5">
              <h4 className="font-bold flex items-center justify-between mb-4">
                 Recent Activity
                 <Button variant="ghost" size="sm" className="text-[10px] uppercase font-black opacity-40">View All</Button>
              </h4>
              <div className="space-y-4">
                 {[1,2,3].map(i => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                          <Play className="w-3 h-3 text-primary" />
                       </div>
                       <div className="flex-1">
                          <div className="text-xs font-bold leading-none">Customer Onboarding Run</div>
                          <div className="text-[10px] text-muted-foreground mt-1">2 minutes ago &bull; Success</div>
                       </div>
                    </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, icon: Icon, loading }: any) {
  return (
    <Card className="glass border-none rounded-3xl shadow-xl shadow-muted/10 overflow-hidden group hover:bg-muted/10 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
           <div className="w-10 h-10 rounded-xl bg-muted/40 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
              <Icon className="w-5 h-5" />
           </div>
           {loading ? <Skeleton className="h-4 w-12 rounded-full" /> : (
             <div className={cn(
              "text-[10px] font-bold px-2 py-1 rounded-full",
              trend === "up" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            )}>
              {change}
            </div>
           )}
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{title}</div>
          {loading ? <Skeleton className="h-8 w-24" /> : <div className="text-2xl font-black">{value}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

function OnboardingItem({ title, desc, done, link }: any) {
  return (
    <Link href={link}>
      <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group">
        <div className="space-y-0.5">
          <div className={cn("text-xs font-bold flex items-center gap-2", done && "text-muted-foreground line-through")}>
             {title}
          </div>
          <div className="text-[10px] text-muted-foreground">{desc}</div>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

const mockHistory = [
  { name: "Mon", value: 30 },
  { name: "Tue", value: 45 },
  { name: "Wed", value: 25 },
  { name: "Thu", value: 65 },
  { name: "Fri", value: 40 },
  { name: "Sat", value: 90 },
  { name: "Sun", value: 120 },
];
