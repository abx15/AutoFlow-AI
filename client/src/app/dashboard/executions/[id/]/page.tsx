"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  PlayCircle,
  ChevronLeft,
  Terminal,
  Cpu,
  Search,
  Code,
  Database,
  Mail,
  MessageSquare,
  CheckCircle2,
  Clock,
  Zap,
  RefreshCcw,
  Copy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

const mockSteps = [
  {
    id: 1,
    type: "thought",
    content:
      "I need to process the customer onboarding request. First, I'll extract the customer data from the webhook input.",
    time: "11:05:12",
  },
  {
    id: 2,
    type: "tool",
    tool: "extract_json",
    input: '{ "raw": "..." }',
    output: '{ "name": "John Doe", "email": "john@example.com" }',
    time: "11:05:13",
  },
  {
    id: 3,
    type: "thought",
    content:
      "Data extracted. Now I'll check if the customer already exists in the CRM.",
    time: "11:05:14",
  },
  {
    id: 4,
    type: "tool",
    tool: "crm_search",
    input: '{ "email": "john@example.com" }',
    output: '{ "found": false }',
    time: "11:05:16",
  },
  {
    id: 5,
    type: "thought",
    content:
      "Customer is new. I'll create a new record and send a welcome email.",
    time: "11:05:17",
  },
  {
    id: 6,
    type: "tool",
    tool: "crm_create",
    input: '{ "name": "John Doe" }',
    output: '{ "id": "cust_99" }',
    time: "11:05:19",
  },
  {
    id: 7,
    type: "tool",
    tool: "send_email",
    input: '{ "to": "john@example.com", "template": "welcome" }',
    output: '{ "sent": true }',
    time: "11:05:21",
  },
  {
    id: 8,
    type: "thought",
    content: "Onboarding complete. Notifying the team on Slack.",
    time: "11:05:22",
  },
  {
    id: 9,
    type: "tool",
    tool: "slack_notify",
    input: '{ "channel": "#new-customers", "text": "John Doe joined!" }',
    output: "ok",
    time: "11:05:23",
  },
  {
    id: 10,
    type: "result",
    content: "Customer onboarding successful. All systems updated.",
    time: "11:05:24",
  },
];

export default function ExecutionDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("logs");
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const toggleStep = (stepId: number) => {
    setExpandedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((i) => i !== stepId)
        : [...prev, stepId],
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/executions">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">
              Execution Detail
            </h1>
            <Badge variant="outline" className="font-mono bg-muted/50">
              {id}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
            Workflow:{" "}
            <span className="text-foreground font-bold">
              Customer Onboarding
            </span>{" "}
            • Status: <span className="text-green-500 font-bold">Success</span>
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => toast.success("JSON copied to clipboard")}
          >
            <Copy className="w-4 h-4" />
            Copy JSON
          </Button>
          <Button className="gap-2">
            <RefreshCcw className="w-4 h-4" />
            Rerun
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left: Metadata Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="glass border-none shadow-xl">
            <CardContent className="p-6 space-y-6">
              <div>
                <LabelItem
                  label="Started At"
                  value="Apr 19, 11:05:12 AM"
                  icon={Clock}
                />
                <LabelItem label="Duration" value="12.4s" icon={Zap} />
                <LabelItem label="Total Tokens" value="420" icon={Activity} />
                <LabelItem
                  label="AI Model"
                  value="Claude 3.5 Sonnet"
                  icon={Cpu}
                />
              </div>
              <hr className="border-border/50" />
              <div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                  Input Data
                </div>
                <div className="bg-muted/50 rounded-xl p-4 font-mono text-[10px] overflow-x-auto whitespace-pre">
                  {`{
  "email": "john@example.com",
  "name": "John Doe",
  "source": "landing_page"
}`}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Agent Viewer */}
        <div className="lg:col-span-3">
          <div className="bg-[#0D0D15] rounded-3xl border border-border/50 shadow-2xl overflow-hidden flex flex-col h-[700px]">
            <div className="flex items-center justify-between p-4 border-b border-border/20 bg-muted/10">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-[10px] font-mono text-muted-foreground font-bold tracking-widest flex items-center gap-2">
                  <Terminal className="w-3 h-3" /> AGENT_EXECUTION_LOG.SH
                </div>
              </div>
              <div className="flex bg-muted/30 p-1 rounded-lg gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "h-7 px-3 text-[10px] font-bold uppercase",
                    activeTab === "logs" && "bg-white/10 text-white",
                  )}
                  onClick={() => setActiveTab("logs")}
                >
                  Logs
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "h-7 px-3 text-[10px] font-bold uppercase",
                    activeTab === "output" && "bg-white/10 text-white",
                  )}
                  onClick={() => setActiveTab("output")}
                >
                  Final Output
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 font-mono scrollbar-thin scrollbar-thumb-white/10">
              {activeTab === "logs" ? (
                mockSteps.map((step, i) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative group"
                  >
                    <div className="text-[10px] text-muted-foreground/40 absolute -left-4 top-1 select-none">
                      {i + 1}
                    </div>

                    {step.type === "thought" ? (
                      <div className="flex gap-4">
                        <div className="mt-1 w-2 h-2 rounded-full bg-blue-500/50 shrink-0" />
                        <div className="space-y-1">
                          <div className="text-[10px] font-bold text-blue-400/70 tracking-widest uppercase flex items-center gap-2">
                            Thought{" "}
                            <span className="opacity-30">@{step.time}</span>
                          </div>
                          <div className="text-sm text-foreground/90 leading-relaxed max-w-2xl italic">
                            {step.content}
                          </div>
                        </div>
                      </div>
                    ) : step.type === "tool" ? (
                      <div className="flex gap-4">
                        <div className="mt-1 w-2 h-2 rounded-full bg-purple-500/50 shrink-0" />
                        <div className="flex-1 space-y-3">
                          <button
                            onClick={() => toggleStep(step.id)}
                            className="text-[10px] font-bold text-purple-400/70 tracking-widest uppercase flex items-center gap-2 hover:text-purple-400 transition-colors w-full"
                          >
                            <span className="flex items-center gap-1.5">
                              <Zap className="w-3 h-3 fill-purple-400" />
                              Tool Call: {step.tool}
                            </span>
                            <span className="opacity-30">@{step.time}</span>
                            {expandedSteps.includes(step.id) ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </button>

                          {expandedSteps.includes(step.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              className="space-y-3 overflow-hidden"
                            >
                              <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                                <div className="text-[9px] text-muted-foreground uppercase mb-2">
                                  Input
                                </div>
                                <div className="text-[11px] text-purple-200/60">
                                  {step.input}
                                </div>
                              </div>
                              <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-4">
                                <div className="text-[9px] text-muted-foreground uppercase mb-2">
                                  Result
                                </div>
                                <div className="text-[11px] text-green-300/60 font-bold">
                                  {step.output}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-4 border-l-2 border-green-500/50 pl-4 py-2 bg-green-500/5 rounded-r-xl">
                        <div className="flex-1 space-y-1">
                          <div className="text-[10px] font-bold text-green-500 tracking-widest uppercase flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3" /> Success{" "}
                            <span className="opacity-30">@{step.time}</span>
                          </div>
                          <div className="text-sm text-green-100 font-bold">
                            {step.content}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white">
                      Final Workflow Result
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-[10px] font-bold uppercase"
                    >
                      Copy Output
                    </Button>
                  </div>
                  <pre className="p-6 bg-white/5 rounded-3xl text-sm leading-8 text-foreground/80 overflow-x-auto whitespace-pre">
                    {`{
  "status": "completed",
  "data": {
    "customer": {
      "id": "cust_99",
      "email": "john@example.com",
      "crm_status": "synced"
    },
    "actions_taken": [
      "created_record",
      "sent_welcome_email",
      "slack_notified"
    ]
  },
  "metadata": {
    "duration": "12.4s",
    "agent": "AutoFlow_Alpha_v1.2",
    "timestamp": "2024-04-19T11:05:24Z"
  }
}`}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelItem({ label, value, icon: Icon }: any) {
  return (
    <div className="flex items-center justify-between py-1 px-1">
      <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
        <Icon className="w-3.5 h-3.5 text-primary" />
        {label}
      </div>
      <div className="text-xs font-bold font-mono">{value}</div>
    </div>
  );
}
