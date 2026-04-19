'use client';

import { useInView } from "react-intersection-observer";
import { PenTool, Zap, Cpu, ArrowRight, Waypoints, Code2, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    {
      title: "Define the Protocol",
      description: "Write your workflow logic in natural language or use our visual builder. The engine automatically maps your intent to executable API actions.",
      icon: <PenTool className="h-6 w-6 text-brand-400" />,
      visual: (
        <div className="bg-[#0A0A12] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-[40px] group-hover:bg-brand-500/20 transition-colors" />
          <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="text-[10px] font-mono text-slate-500 ml-2 uppercase tracking-widest">prompt.txt</span>
          </div>
          <p className="text-sm font-mono text-slate-300 leading-relaxed group-hover:text-white transition-colors">
            <span className="text-brand-400">&quot;</span>When a Stripe webhook drops for `invoice.paid`, check the amount. If &gt; $1k, save to CRM, enrich via clearbit, and ping #sales in Slack.<span className="text-brand-400">&quot;</span>
          </p>
          <div className="mt-4 flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
             <span className="text-[10px] font-bold text-brand-400 tracking-widest uppercase">Auto-Generating Logic Graph...</span>
          </div>
        </div>
      )
    },
    {
      title: "Connect the Synapses",
      description: "Inject parameters via webhooks, REST API endpoints, or scheduled cron jobs. The platform handles schema validation natively constraints.",
      icon: <Waypoints className="h-6 w-6 text-purple-400" />,
      visual: (
        <div className="grid grid-cols-1 gap-3 relative">
          {/* Connector dashed line */}
          <div className="absolute left-[30px] top-6 bottom-6 w-px border-l-2 border-dashed border-white/10" />
          
          {[
            { t: 'Webhook Stream', i: <Zap className="w-4 h-4 text-yellow-400" />, c: "border-yellow-500/30 bg-yellow-500/5" },
            { t: 'Cron Scheduler', i: <Clock className="w-4 h-4 text-blue-400" />, c: "border-white/5 bg-black/40" },
            { t: 'API Invocation', i: <Code2 className="w-4 h-4 text-green-400" />, c: "border-white/5 bg-black/40" }
          ].map((item, i) => (
            <div key={item.t} className={cn("flex items-center gap-4 relative z-10 p-3 rounded-xl border backdrop-blur-sm", item.c)}>
               <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
                 {item.i}
               </div>
               <div className="text-sm font-bold text-white">{item.t}</div>
               {i === 0 && <span className="ml-auto text-[10px] font-black uppercase text-yellow-500 tracking-wider">Active</span>}
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Autonomous Execution",
      description: "Deploy instantly to our edge network. The AI agent executes step-by-step, adapting to API errors and context drift automatically.",
      icon: <Cpu className="h-6 w-6 text-green-400" />,
      visual: (
        <div className="bg-black/80 border border-white/10 rounded-2xl p-5 font-mono text-xs space-y-3 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-3">
             <Play className="w-4 h-4 text-green-500 fill-current" />
             <span className="text-white font-bold tracking-widest uppercase text-[10px]">Execution Trace</span>
             <span className="ml-auto text-slate-500">221ms</span>
          </div>
          <div className="text-slate-400 hover:text-white transition-colors">&gt; Trigger received: `invoice.paid`</div>
          <div className="flex items-center gap-2 group cursor-default">
             <div className="w-px h-8 bg-brand-500/30 ml-1.5" />
             <div>
                <div className="text-brand-400 font-bold mb-1">🔧 Tool Exec: `fetch_CRM`</div>
                <div className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-[10px]">SUCCESS: Record found</div>
             </div>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
             <div className="w-px h-8 bg-brand-500/30 ml-1.5" />
             <div>
                <div className="text-blue-400 font-bold mb-1">🔧 Tool Exec: `slack_alert`</div>
                <div className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-[10px]">SUCCESS: Message posted</div>
             </div>
          </div>
          <div className="text-white/60">&gt; Workflow Terminated Gracefully.</div>
        </div>
      )
    }
  ];

  return (
    <div id="how-it-works" className="py-32 bg-[#05050A] overflow-hidden relative">
      <div className="absolute inset-0 bg-surface-muted/30 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-32">
           <h2 className="text-sm font-black text-brand-500 uppercase tracking-[0.3em] mb-4">Architecture</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
            Three steps to pure autonomy
          </h3>
          <p className="text-xl text-slate-400">
            From natural language instruction to fault-tolerant microservice in seconds.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Glowing central spine */}
          <div className="hidden lg:block absolute left-[50%] top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-brand-500/50 to-transparent transform -translate-x-1/2" />
          
          <div className="space-y-32">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  
                  {/* Glowing Node */}
                  <div className="hidden lg:flex absolute left-[50%] transform -translate-x-1/2 w-16 h-16 rounded-2xl bg-[#05050A] border border-white/10 items-center justify-center z-10 transition-all duration-700" 
                    style={{ 
                      boxShadow: inView ? '0 0 40px rgba(99,102,241,0.3)' : 'none',
                      borderColor: inView ? 'rgba(99,102,241,0.5)' : '',
                    }}>
                    <span className="text-2xl font-black text-white">{index + 1}</span>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: index * 0.2 }}
                    className={cn(
                      "flex-1 w-full flex flex-col justify-center", 
                      isEven ? "lg:text-right lg:pr-16" : "lg:pl-16 lg:order-last"
                    )}
                  >
                    <div className={cn(
                      "inline-flex items-center justify-center w-16 h-16 rounded-[2rem] border mb-6 relative group overflow-hidden",
                      index === 0 ? "bg-brand-500/10 border-brand-500/20" : 
                      index === 1 ? "bg-purple-500/10 border-purple-500/20" : 
                      "bg-green-500/10 border-green-500/20"
                    )}>
                      {step.icon}
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-slate-400 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.7, delay: index * 0.2 + 0.2 }}
                    className="flex-1 w-full"
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-white/5 blur-2xl group-hover:bg-brand-500/10 transition-colors rounded-[2.5rem]" />
                      <div className="relative glass p-2 rounded-[2.5rem] border border-white/5 group-hover:border-white/10 transition-colors">
                        {step.visual}
                      </div>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
// Add custom mock imports if needed for visual components
function Clock(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
