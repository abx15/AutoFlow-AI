import Link from "next/link";
import { ArrowLeft, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GenericMarketingPage({ params }: { params: { slug: string } }) {
  // Format slug for title (e.g. "privacy-policy" -> "Privacy Policy")
  const title = (params.slug || "").split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-[#05050A]">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="relative z-10 max-w-2xl px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-8 animate-pulse-slow">
           <Zap className="h-8 w-8 text-brand-400" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
          {title}
        </h1>
        
        <div className="glass p-8 rounded-3xl border border-white/10 mb-8 inline-block shadow-2xl">
           <div className="flex items-center justify-center gap-3 text-brand-400 mb-2">
             <Clock className="w-5 h-5 animate-spin-slow" />
             <span className="font-bold tracking-widest uppercase text-xs">Work In Progress</span>
           </div>
           <p className="text-slate-400">
             This component of the platform is currently being forged by our AI agents. Check back soon for the official release of our {title.toLowerCase()} page.
           </p>
        </div>

        <div>
          <Link href="/">
             <Button variant="outline" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2">
               <ArrowLeft className="w-4 h-4" /> Return to Hub
             </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
