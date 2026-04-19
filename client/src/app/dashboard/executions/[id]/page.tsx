"use client";

import { use, useEffect, useState, useRef } from "react";
import { 
  Activity, 
  Terminal, 
  Cpu, 
  Zap, 
  ChevronRight, 
  CheckCircle2, 
  XCircle,
  Clock,
  Code2,
  Box,
  Layers,
  ArrowRight,
  Share2,
  AlertTriangle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useExecutionDetail } from "@/lib/api/hooks/executionHooks";
import { useRealtime } from "@/hooks/useRealtime";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function ExecutionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: execution, isLoading } = useExecutionDetail(id);
  const { events, status: realtimeStatus } = useRealtime(id);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic for live logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  if (isLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-black uppercase text-[10px] tracking-widest">Reconstructing Execution State</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black">Execution Details</h1>
            <Badge variant="outline" className="font-mono text-[10px] bg-muted/30 border-none">#{id.slice(0, 12)}</Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            {execution?.workflowName || "AI Workflow"} &bull; Started {new Date(execution?.startedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 border-none bg-muted/30 rounded-xl gap-2 px-6">
            <Share2 className="w-4 h-4" /> Share
          </Button>
          <Badge className={cn(
             "h-10 px-4 rounded-xl border flex gap-2 items-center",
             execution?.status === "success" ? "bg-green-500/10 text-green-500 border-green-500/20" :
             execution?.status === "failed" ? "bg-red-500/10 text-red-500 border-red-500/20" :
             "bg-blue-500/10 text-blue-500 border-blue-500/20"
          )}>
            <div className={cn("w-2 h-2 rounded-full", execution?.status === "success" ? "bg-green-500" : "bg-blue-500 animate-pulse")} />
            <span className="font-black uppercase text-[10px] tracking-widest">{execution?.status || "RUNNING"}</span>
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Agent Viewer */}
        <div className="lg:col-span-2 space-y-6">
          <CardContainer title="Agent Reasoning Engine" icon={Cpu}>
            <div 
              ref={scrollRef}
              className="h-[600px] overflow-y-auto font-mono text-sm space-y-4 p-6 custom-scrollbar"
            >
              {events.length === 0 && !execution?.steps && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                  <Terminal className="w-12 h-12" />
                  <p className="max-w-[200px] text-xs uppercase font-bold">Waiting for agent activity signal...</p>
                </div>
              )}

              {/* Render Historical Steps if available */}
              {execution?.steps?.map((step: any, idx: number) => (
                <LogEntry key={`hist-${idx}`} type={step.type || "thought"} content={step.content} time={step.time} tool={step.tool} input={step.input} output={step.output} />
              ))}

              {/* Render Live SSE Events */}
              {events.map((event, idx) => (
                <LogEntry key={`live-${idx}`} {...event} />
              ))}

              {realtimeStatus === "active" && (
                <div className="flex items-center gap-2 text-primary animate-pulse py-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Agent is thinking...</span>
                </div>
              )}
            </div>
          </CardContainer>
        </div>

        {/* Sidebar Metrics */}
        <div className="space-y-6">
          <CardContainer title="Execution Stats" icon={Activity}>
            <div className="p-6 space-y-6">
              <StatRow label="Runtime" value={execution?.durationMs ? `${execution.durationMs}ms` : "-"} icon={Clock} />
              <StatRow label="Model" value={execution?.aiModel || "GPT-4o"} icon={Cpu} />
              <StatRow label="Resource Usage" value={`${execution?.tokensUsed || 0} tokens`} icon={Layers} />
              <StatRow label="Region" value="aws-us-east-1" icon={Globe} />
            </div>
          </CardContainer>

          <CardContainer title="Input Payload" icon={Code2}>
            <div className="p-6">
              <pre className="text-[10px] bg-muted/30 p-4 rounded-xl overflow-x-auto text-primary font-bold">
                {JSON.stringify(execution?.input || { query: "User prompt payload" }, null, 2)}
              </pre>
            </div>
          </CardContainer>

          <div className="p-6 glass rounded-3xl border border-border/50 bg-primary/5">
            <h4 className="flex items-center gap-2 font-bold mb-4 text-sm">
              <Zap className="w-4 h-4 text-primary" />
              Optimization Tip
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This workflow used 12% more tokens than average. Consider refining the system prompt to reduce agent verbosity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogEntry({ type, content, tool, time, input, output }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-4 rounded-2xl border transition-all",
        type === "thought" ? "bg-muted/30 border-transparent shadow-sm" : 
        type === "tool" ? "bg-primary/5 border-primary/20" :
        type === "error" ? "bg-destructive/5 border-destructive/20" :
        "bg-green-500/5 border-green-500/20"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {type === "thought" && <Bot className="w-3.5 h-3.5 text-muted-foreground" />}
          {type === "tool" && <Settings className="w-3.5 h-3.5 text-primary animate-spin-slow" />}
          {type === "result" && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
          {type === "error" && <AlertTriangle className="w-3.5 h-3.5 text-destructive" />}
          <span className={cn(
            "text-[10px] font-black uppercase tracking-widest",
            type === "thought" ? "text-muted-foreground" : 
            type === "tool" ? "text-primary" :
            type === "error" ? "text-destructive" : "text-green-500"
          )}>{type}</span>
        </div>
        <span className="text-[10px] font-mono opacity-30">{time}</span>
      </div>
      
      {content && <p className="text-xs leading-relaxed opacity-80">{content}</p>}
      
      {tool && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
             <Badge variant="outline" className="font-mono text-[10px] border-primary/20 text-primary bg-primary/5">tool::{tool}()</Badge>
          </div>
          {input && (
            <div className="space-y-1">
              <div className="text-[9px] uppercase font-bold opacity-30 flex items-center gap-1">
                <ArrowRight className="w-2.5 h-2.5" /> Call Input
              </div>
              <pre className="text-[10px] opacity-60 overflow-x-auto">{JSON.stringify(input, null, 2)}</pre>
            </div>
          )}
          {output && (
            <div className="space-y-1">
              <div className="text-[9px] uppercase font-bold opacity-30 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-primary" /> Return Output
              </div>
              <pre className="text-[10px] text-primary/80 overflow-x-auto">{JSON.stringify(output, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

function CardContainer({ title, icon: Icon, children }: any) {
  return (
    <div className="glass rounded-[2rem] border border-border/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-border/50 bg-muted/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-black uppercase tracking-widest">{title}</h3>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/20" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
          <div className="w-2 h-2 rounded-full bg-green-500/20" />
        </div>
      </div>
      {children}
    </div>
  );
}

function StatRow({ label, value, icon: Icon }: any) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-muted/40 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
      </div>
      <span className="text-xs font-bold font-mono">{value}</span>
    </div>
  );
}
