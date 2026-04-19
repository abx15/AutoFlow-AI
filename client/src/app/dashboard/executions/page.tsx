"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  Activity,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useExecutions } from "@/lib/api/hooks/executionHooks";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function ExecutionsPage() {
  const [params, setParams] = useState({ page: 1, limit: 10, search: "" });
  const { data, isLoading } = useExecutions(params);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground">Executions</h1>
          <p className="text-muted-foreground text-sm">Audit trail of all workflow runs across your organization.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 h-11 border-none bg-muted/30 rounded-xl">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button className="gap-2 h-11 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 rounded-xl">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by execution ID or workflow name..." 
            className="pl-10 h-12 bg-muted/30 border-none rounded-xl"
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value })}
          />
        </div>
        <Button variant="outline" className="h-12 border-none bg-muted/30 rounded-xl gap-2 px-6">
          <Filter className="w-4 h-4" />
          More Filters
        </Button>
      </div>

      <div className="glass rounded-[2rem] overflow-hidden border border-border/50">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-muted/20">
              <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Execution</th>
              <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Workflow</th>
              <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Status</th>
              <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Duration</th>
              <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Usage</th>
              <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-muted-foreground text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {isLoading ? (
              [1,2,3,4,5].map(i => <ExecutionRowSkeleton key={i} />)
            ) : data?.executions?.map((execution: any) => (
              <tr key={execution.id} className="group hover:bg-muted/10 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-mono text-[10px] text-muted-foreground">#{execution.id.slice(0, 8)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(execution.startedAt).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-foreground">
                  {execution.workflowName || "Unknown Workflow"}
                </td>
                <td className="px-6 py-4">
                   <StatusBadge status={execution.status} />
                </td>
                <td className="px-6 py-4 text-muted-foreground font-mono">
                  {execution.durationMs ? `${execution.durationMs}ms` : "-"}
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className="font-mono text-[10px] bg-muted/30 border-none">
                    {execution.tokensUsed || 0} tokens
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/dashboard/executions/${execution.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!isLoading && data?.executions?.length === 0 && (
          <div className="p-12 text-center space-y-4">
            <Activity className="w-12 h-12 text-muted-foreground mx-auto" />
            <div className="font-bold">No executions yet</div>
            <p className="text-muted-foreground text-xs">When your workflows run, their results will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    success: { icon: CheckCircle2, class: "bg-green-500/10 text-green-500 border-green-500/20" },
    failed: { icon: XCircle, class: "bg-red-500/10 text-red-500 border-red-500/20" },
    running: { icon: Activity, class: "bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse" },
    pending: { icon: Clock, class: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  };

  const config = configs[status] || configs.pending;
  const Icon = config.icon;

  return (
    <Badge className={cn("rounded-md gap-1 px-2 border", config.class)}>
      <Icon className="w-3 h-3" />
      <span className="uppercase text-[10px] font-black">{status}</span>
    </Badge>
  );
}

function ExecutionRowSkeleton() {
  return (
    <tr>
      <td className="px-6 py-4">
        <Skeleton className="h-3 w-16 mb-2 bg-muted/50" />
        <Skeleton className="h-3 w-24 bg-muted/50" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-32 bg-muted/50" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-6 w-20 bg-muted/50" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-12 bg-muted/50" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-5 w-16 bg-muted/50" />
      </td>
      <td className="px-6 py-4 text-right">
        <Skeleton className="h-8 w-8 ml-auto rounded-lg bg-muted/50" />
      </td>
    </tr>
  );
}
