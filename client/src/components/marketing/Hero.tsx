"use client";

import { motion } from "framer-motion";
import { ChevronRight, Play, FileText, Zap, Mail, MessageSquare, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const workflowSteps = [
  { icon: Zap, label: "Webhook Trigger", color: "bg-blue-500" },
  { icon: Cpu, label: "AI Reasoning", color: "bg-purple-500" },
  { icon: Mail, label: "Send Email", color: "bg-green-500" },
  { icon: MessageSquare, label: "Slack Notify", color: "bg-sky-500" },
  { icon: Database, label: "CRM Sync", color: "bg-orange-500" },
];

import { Cpu } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New: Claude 3.5 Sonnet Integration
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Automate Your Business <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              with AI Agents
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed">
            Connect any tool. Automate any workflow. <br className="hidden md:block" />
            No code required. Just describe what you want and let our agents handle the complexity.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 px-8 text-lg shadow-xl shadow-primary/20 group">
                Start for Free
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/docs" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full h-14 px-8 text-lg group">
                <FileText className="mr-2 w-5 h-5" />
                View Documentation
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground/60 flex items-center gap-4">
            <span>No credit card required</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>100K free tokens/month</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>5 min setup</span>
          </p>
        </motion.div>

        {/* Visual / Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="glass rounded-3xl p-8 relative z-10 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
                workflow_builder_v2.exe
              </div>
            </div>

            <div className="space-y-6 relative">
              {/* Animated Lines */}
              <div className="absolute left-[24px] top-[24px] bottom-[24px] w-0.5 bg-gradient-to-b from-primary via-accent to-transparent opacity-20" />
              
              {workflowSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg relative z-10 transition-transform group-hover:scale-110",
                    step.color
                  )}>
                    <step.icon className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                    <div className="text-sm font-semibold">{step.label}</div>
                    <div className="text-[10px] text-muted-foreground">Status: Active</div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Pulsing indicator for current step */}
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute left-[20px] top-[102px] w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.8)] z-20"
            />
          </div>

          {/* Floating Element 1 - JSON Code */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-xl z-20 hidden sm:block"
          >
            <pre className="text-[10px] font-mono whitespace-pre text-primary">
{`{
  "status": "success",
  "agent": "AutoFlow_Alpha",
  "result": "Email sent to lead"
}`}
            </pre>
          </motion.div>

          {/* Floating Element 2 - Speed */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 glass px-6 py-3 rounded-2xl shadow-xl z-20 hidden sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <Play className="w-4 h-4 text-green-500 fill-green-500" />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground">Execution Time</div>
                <div className="text-sm font-bold font-mono">1.2s</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
