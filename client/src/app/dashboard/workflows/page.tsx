"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Play, 
  Pause, 
  Zap, 
  Settings,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkflows, useUpdateWorkflowStatus, useRunWorkflow } from "@/lib/api/hooks/workflowHooks";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function WorkflowsPage() {
  const [search, setSearch] = useState("");
  const { data: workflows, isLoading, error } = useWorkflows({ search });
  const { mutate: updateStatus } = useUpdateWorkflowStatus();
  const { mutate: runWorkflow } = useRunWorkflow();
  const router = useRouter();

  const handleRun = (id: string) => {
    runWorkflow({ id }, {
      onSuccess: (data) => {
        router.push(`/dashboard/executions/${data.executionId}`);
      }
    });
  };

  if (error) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <h2 className="text-xl font-bold">Failed to load workflows</h2>
        <p className="text-muted-foreground text-sm">Please check your connection and try again.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Workflows</h1>
          <p className="text-muted-foreground text-sm">Manage and monitor your AI-powered automations.</p>
        </div>
        <Link href="/dashboard/workflows/new">
          <Button className="gap-2 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 rounded-xl h-12 px-6">
            <Plus className="w-5 h-5" />
            New Workflow
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search workflows by name..." 
            className="pl-10 h-12 bg-muted/30 border-none rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-12 border-none bg-muted/30 rounded-xl gap-2 px-6">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <WorkflowSkeleton key={i} />)}
        </div>
      ) : workflows?.length === 0 ? (
        <div className="h-[40vh] glass rounded-3xl flex flex-col items-center justify-center space-y-6 text-center p-12">
          <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center">
            <Zap className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">No workflows found</h3>
            <p className="text-muted-foreground max-w-sm text-sm">
              You haven't created any workflows yet. Get started by building your first AI automation.
            </p>
          </div>
          <Link href="/dashboard/workflows/new">
            <Button variant="outline" className="rounded-xl">Create your first workflow</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          {workflows?.map((workflow) => (
            <WorkflowCard 
              key={workflow.id} 
              workflow={workflow} 
              onToggleStatus={() => updateStatus({ 
                id: workflow.id, 
                status: workflow.status === "active" ? "paused" : "active" 
              })}
              onRun={() => handleRun(workflow.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function WorkflowCard({ workflow, onToggleStatus, onRun }: { workflow: any, onToggleStatus: () => void, onRun: () => void }) {
  return (
    <Card className="glass-card hover-glow border-none transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <Badge variant={workflow.status === "active" ? "default" : "secondary"} className="rounded-md uppercase text-[10px] font-bold">
            {workflow.status}
          </Badge>
        </div>
        <div className="pt-4 space-y-1">
          <CardTitle className="text-lg font-bold truncate">{workflow.name}</CardTitle>
          <CardDescription className="text-xs line-clamp-2 min-h-[32px]">{workflow.description || "No description provided."}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-muted/30">
            <div className="text-[10px] text-muted-foreground uppercase font-black mb-1">Success Rate</div>
            <div className="font-bold text-green-500">{workflow.successRate}%</div>
          </div>
          <div className="p-3 rounded-xl bg-muted/30">
            <div className="text-[10px] text-muted-foreground uppercase font-black mb-1">Executions</div>
            <div className="font-bold">{workflow.executionsCount}</div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="h-9 w-9 bg-muted/30 rounded-lg hover:bg-primary hover:text-white transition-colors" onClick={onRun}>
              <Play className="w-4 h-4 fill-current" />
            </Button>
            <Button size="icon" variant="ghost" className="h-9 w-9 bg-muted/30 rounded-lg" onClick={onToggleStatus}>
              {workflow.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-9 w-9 bg-muted/30 rounded-lg">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass border-border/50">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem className="gap-2">
                <Settings className="w-4 h-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Filter className="w-4 h-4" /> View Logs
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem className="text-destructive gap-2">
                <Plus className="w-4 h-4 rotate-45" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

function WorkflowSkeleton() {
  return (
    <Card className="glass-card border-none">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <Skeleton className="w-10 h-10 rounded-xl bg-muted/50" />
          <Skeleton className="h-5 w-16 bg-muted/50" />
        </div>
        <div className="pt-4 space-y-2">
          <Skeleton className="h-6 w-3/4 bg-muted/50" />
          <Skeleton className="h-4 w-full bg-muted/50" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-14 rounded-xl bg-muted/50" />
          <Skeleton className="h-14 rounded-xl bg-muted/50" />
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="flex gap-2">
            <Skeleton className="w-9 h-9 rounded-lg bg-muted/50" />
            <Skeleton className="w-9 h-9 rounded-lg bg-muted/50" />
          </div>
          <Skeleton className="w-9 h-9 rounded-lg bg-muted/50" />
        </div>
      </CardContent>
    </Card>
  );
}
