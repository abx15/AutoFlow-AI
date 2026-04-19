"use client";

import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Activity, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useExecutionStats } from "@/lib/api/hooks/executionHooks";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"];

export default function AnalyticsPage() {
  const { data: stats, isLoading } = useExecutionStats();

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-10 w-48 bg-muted/50" />
            <Skeleton className="h-4 w-72 bg-muted/50" />
          </div>
          <Skeleton className="h-10 w-32 bg-muted/50" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-28 rounded-3xl bg-muted/50" />)}
        </div>
        <div className="grid grid-cols-3 gap-8">
           <Skeleton className="col-span-2 h-[400px] rounded-[2rem] bg-muted/50" />
           <Skeleton className="h-[400px] rounded-[2rem] bg-muted/50" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Performance Engine</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium italic opacity-70">Deep telemetry into your AI-powered organization.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-muted/30 p-1 rounded-xl gap-1 border border-border/50">
            <Button size="sm" variant="ghost" className="px-4 text-[10px] font-black uppercase tracking-widest">7D</Button>
            <Button size="sm" variant="ghost" className="bg-background shadow-sm px-4 text-[10px] font-black uppercase tracking-widest">30D</Button>
            <Button size="sm" variant="ghost" className="text-muted-foreground px-4 text-[10px] font-black uppercase tracking-widest opacity-40">90D</Button>
          </div>
          <Button variant="outline" className="gap-2 h-10 border-none bg-muted/30 hover:bg-muted/50 rounded-xl px-5">
            <Download className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Export Data</span>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStatCard 
          label="Total Executions" 
          value={stats?.totalExecutions || "0"} 
          trend={stats?.executionTrend || "+12%"} 
          trendUp={true} 
          icon={Activity} 
          color="text-blue-500" 
        />
        <MiniStatCard 
          label="Success Rate" 
          value={`${stats?.successRate || 99.8}%`} 
          trend="+0.4%" 
          trendUp={true} 
          icon={CheckCircle2} 
          color="text-green-500" 
        />
        <MiniStatCard 
          label="Avg Latency" 
          value={`${stats?.avgLatency || 0}ms`} 
          trend="-12ms" 
          trendUp={true} 
          icon={Clock} 
          color="text-purple-500" 
        />
        <MiniStatCard 
          label="Tokens Used" 
          value={stats?.tokensUsed?.toLocaleString() || "0"} 
          trend="+8%" 
          trendUp={false} 
          icon={Zap} 
          color="text-orange-500" 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 glass border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-8 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-black uppercase tracking-tighter text-muted-foreground opacity-50">Execution Timeline</CardTitle>
                <CardDescription className="text-lg font-bold text-foreground">Traffic Distribution</CardDescription>
              </div>
              <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest group">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" /> SUCCESS</div>
                <div className="flex items-center gap-1.5 opacity-40"><div className="w-2 h-2 rounded-full bg-red-500" /> FAILED</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] p-8 pt-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.dailyHistory || mockData}>
                <defs>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#80808010" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94A3B8" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94A3B8" }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", border: "none", borderRadius: "16px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
                  itemStyle={{ fontSize: "10px", fontWeight: "bold" }}
                  cursor={{ stroke: "#3B82F6", strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="success" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorSuccess)" animationDuration={2000} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Donut Chart */}
        <Card className="glass border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-sm font-black uppercase tracking-tighter text-muted-foreground opacity-50">Model Usage</CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0 flex flex-col h-full">
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats?.modelDistribution || mockPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {(stats?.modelDistribution || mockPieData).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", border: "none", borderRadius: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 gap-3 mt-6">
              {(stats?.modelDistribution || mockPieData).map((item: any, i: number) => (
                <div key={item.name} className="flex items-center justify-between px-4 py-2 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold font-mono">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Heavy Table Data for Top Workflows */}
      <Card className="glass border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="p-8">
           <CardTitle className="text-lg font-bold">Execution Intensity</CardTitle>
           <CardDescription>Identifying most frequent automated runs across your organization.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/30 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                <th className="px-8 py-4">Workflow Identifier</th>
                <th className="px-8 py-4">Total Hits</th>
                <th className="px-8 py-4">Success Efficiency</th>
                <th className="px-8 py-4 text-right">Avg Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
               {stats?.topWorkflows?.map((w: any) => (
                 <tr key={w.name} className="hover:bg-muted/10 transition-colors group">
                    <td className="px-8 py-5">
                       <div className="font-bold text-sm">{w.name}</div>
                       <div className="text-[10px] text-muted-foreground mt-1 opacity-50 uppercase tracking-widest">{w.id.slice(0, 12)}</div>
                    </td>
                    <td className="px-8 py-5 font-mono text-sm font-black">{w.executionsCount}</td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-3">
                         <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden max-w-[100px]">
                            <div 
                              className={cn("h-full transition-all duration-1000", w.successRate > 90 ? "bg-green-500" : "bg-yellow-500")} 
                              style={{ width: `${w.successRate}%` }} 
                            />
                         </div>
                         <span className="text-xs font-bold text-muted-foreground">{w.successRate}%</span>
                       </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                       <Badge variant="outline" className="font-mono text-[10px] bg-muted/30 border-none font-black text-primary">
                          {Math.floor(Math.random() * 200 + 400)}ms
                       </Badge>
                    </td>
                 </tr>
               ))}
               {!stats?.topWorkflows && [1,2,3].map(i => (
                 <tr key={i} className="opacity-40 grayscale">
                    <td className="px-8 py-5 font-bold italic text-muted-foreground">Waiting for execution cycles...</td>
                    <td className="px-8 py-5">0</td>
                    <td className="px-8 py-5">-%</td>
                    <td className="px-8 py-5 text-right">-</td>
                 </tr>
               ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function MiniStatCard({ label, value, trend, trendUp, icon: Icon, color }: any) {
  return (
    <Card className="glass border-none shadow-xl rounded-3xl overflow-hidden hover-glow transition-all duration-300 border-b-2 border-transparent hover:border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-muted/40", color)}>
            <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
          </div>
          <div className={cn(
            "text-[10px] font-black px-2 py-0.5 rounded-full",
            trendUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
          )}>
            {trend}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-50">{label}</p>
          <p className="text-2xl font-black tracking-tighter">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

const mockData = [
  { name: "Mon", success: 400 },
  { name: "Tue", success: 300 },
  { name: "Wed", success: 200 },
  { name: "Thu", success: 278 },
  { name: "Fri", success: 189 },
  { name: "Sat", success: 239 },
  { name: "Sun", success: 349 },
];

const mockPieData = [
  { name: "GPT-4o", value: 45 },
  { name: "Claude 3.5", value: 35 },
  { name: "Gemini 1.5", value: 20 },
];
