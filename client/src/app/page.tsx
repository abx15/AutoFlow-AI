import Link from "next/link";
import { 
  Zap, 
  Bot, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  Play, 
  CheckCircle2,
  Globe,
  Terminal,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 h-16 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform">
             <Zap className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-black tracking-tighter italic">AutoFlow AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
           <a href="#features" className="hover:text-primary transition-colors">Technology</a>
           <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
           <a href="/docs" className="hover:text-primary transition-colors">Documentation</a>
           <a href="/pricing" className="hover:text-primary transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
           <Link href="/login">
             <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest hover:bg-white/5">Sign In</Button>
           </Link>
           <Link href="/register">
             <Button className="bg-white text-black hover:bg-zinc-200 text-[10px] font-black uppercase tracking-widest px-6 rounded-full h-10 shadow-lg shadow-white/10">
                START BUILDING
             </Button>
           </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary/20 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-1000">
             <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
             Infrastructure v2.4 Is Live
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] italic animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            ORCHESTRATE <br />
            <span className="text-primary group relative inline-block">
              INTELLIGENT
              <span className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-2 md:h-4 bg-primary/20 -rotate-1 -z-10" />
            </span> WORKFLOWS
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            The high-performance engine for autonomous agents. Seamlessly connect LLMs, internal APIs, and 2,000+ software tools in a unified reactive architecture.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
             <Link href="/register">
                <Button className="h-16 px-10 rounded-[2rem] bg-primary text-white hover:bg-primary/90 text-sm font-black italic tracking-widest group shadow-2xl shadow-primary/30">
                  INITIALIZE WORKSPACE
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
             </Link>
             <Button variant="outline" className="h-16 px-10 rounded-[2rem] border-white/10 bg-white/5 hover:bg-white/10 text-sm font-black italic tracking-widest gap-3">
                <Play className="w-5 h-5 fill-current" />
                SEE THE ENGINE
             </Button>
          </div>
        </div>

        {/* Hero Visual - Code Snippet Card */}
        <div className="max-w-5xl mx-auto mt-24 relative group">
           <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           <div className="glass border border-white/10 rounded-[2.5rem] p-4 md:p-8 shadow-2xl overflow-hidden aspect-video md:aspect-[21/9] flex items-center justify-center relative translate-y-0 group-hover:-translate-y-4 transition-transform duration-700">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-full h-full bg-black/40 rounded-2xl flex border border-white/5 overflow-hidden">
                 <div className="w-12 border-r border-white/5 flex flex-col items-center py-4 text-white/20 font-mono text-xs gap-4">
                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
                 </div>
                 <div className="p-8 font-mono text-sm leading-relaxed text-blue-200">
                    <span className="text-primary italic">import</span> {"{ Engine }"} <span className="text-primary italic">from</span> <span className="text-green-400">"@autoflow/sdk"</span>;<br /><br />
                    <span className="text-primary italic">const</span> agent = <span className="text-primary italic">new</span> Engine(<span className="text-zinc-400">process.env.AF_SECRET</span>);<br /><br />
                    <span className="text-zinc-500"> Initialize distributed autonomous workflow</span><br />
                    <span className="text-primary italic">await</span> agent.execute(<span className="text-orange-400">"customer-onboarding-v2"</span>, {"{"}<br />
                    &nbsp;&nbsp;<span className="text-zinc-400">source:</span> <span className="text-green-400">"stripe_webhook"</span>,<br />
                    &nbsp;&nbsp;<span className="text-zinc-400">strategy:</span> <span className="text-green-400">"autonomous_reflection"</span><br />
                    {"}"});
                 </div>
              </div>
              <div className="absolute bottom-12 right-12 w-48 h-48 bg-primary/10 rounded-full blur-[40px] animate-pulse" />
           </div>
        </div>
      </section>

      {/* Social Proof / Logs */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-12 md:gap-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           <span className="text-2xl font-black tracking-tighter flex items-center gap-2"><Globe className="w-8 h-8" /> STRIPE</span>
           <span className="text-2xl font-black tracking-tighter flex items-center gap-2"><Globe className="w-8 h-8" /> GITHUB</span>
           <span className="text-2xl font-black tracking-tighter flex items-center gap-2"><Zap className="w-8 h-8" /> NOTION</span>
           <span className="text-2xl font-black tracking-tighter flex items-center gap-2"><Activity className="w-8 h-8" /> DATA DOG</span>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={Bot} 
            title="LMM Native Scheduling" 
            desc="Workflows are not just pipelines. They are autonomous agent loops that reflect and recover from errors in real-time." 
          />
          <FeatureCard 
            icon={Layers} 
            title="State Management" 
            desc="Massively parallel execution with consistent shared state across 2,000+ nodes using our distributed KV architecture." 
          />
          <FeatureCard 
            icon={ShieldCheck} 
            title="Sovereign Privacy" 
            desc="Run on our cloud or self-host. All AI inferences are encrypted at the edge with zero data retention by default." 
          />
        </div>
      </section>

      <footer className="mt-auto py-20 px-6 border-t border-white/5 text-center">
         <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                 <Zap className="w-6 h-6 fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tighter italic">AutoFlow AI</span>
            </div>
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">
               Designed in London • Built for the Planet • © 2026 AutoFlow AI
            </p>
         </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-primary/20 transition-all duration-500 group">
       <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
          <Icon className="w-8 h-8" />
       </div>
       <h3 className="text-xl font-bold mb-4">{title}</h3>
       <p className="text-sm text-white/40 leading-relaxed font-medium">
          {desc}
       </p>
    </div>
  );
}
