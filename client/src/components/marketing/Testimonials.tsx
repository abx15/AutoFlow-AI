'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const TESTIMONIALS = [
  {
    quote: "AutoFlow AI replaced our entire Zapier + Make.com setup. The developer API is miles ahead — we integrated it in our Next.js app in under an hour.",
    name: "Rahul Sharma",
    role: "CTO @ TechFlow",
    initials: "RS",
    color: "bg-blue-500",
    large: false,
  },
  {
    quote: "Finally, an automation tool that understands context. We described our lead qualification workflow in plain English and it just worked. Saved our sales team 4 hours daily.",
    name: "Priya Mehta",
    role: "Head of Sales @ GrowthCo",
    initials: "PM",
    color: "bg-pink-500",
    large: true,
  },
  {
    quote: "The webhook integration with our CRM was seamless. Token usage is transparent, execution logs are incredibly detailed. This is what enterprise tools should feel like.",
    name: "Alex Kim",
    role: "Backend Engineer @ DataStack",
    initials: "AK",
    color: "bg-indigo-500",
    large: false,
  },
  {
    quote: "We process 500+ support tickets daily through AutoFlow AI. Categorization + priority assignment all automated. Our team only handles the escalations now.",
    name: "Sarah Johnson",
    role: "Support Lead @ HelpdeskPro",
    initials: "SJ",
    color: "bg-emerald-500",
    large: false,
  },
  {
    quote: "As a solo founder, this is like having a full operations team. My daily reports, CRM updates, and email sequences all run automatically. I only check in on what actually needs attention.",
    name: "David Chen",
    role: "Founder @ SaaS Builder",
    initials: "DC",
    color: "bg-orange-500",
    large: true,
  },
  {
    quote: "The audit trail is what sold me. Every token, every tool call, every AI decision logged. Our compliance team actually approved it.",
    name: "Maria Rodriguez",
    role: "Engineering Manager @ FinTech Startup",
    initials: "MR",
    color: "bg-purple-500",
    large: false,
  }
];

export function Testimonials() {
  return (
    <div className="py-[80px] bg-[#0A0A14] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
            Loved by developers worldwide
          </h3>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-1 text-yellow-500">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <span className="text-slate-400 font-medium ml-2">
              5.0 from 200+ reviews
            </span>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={cn(
                "glass p-8 rounded-[2rem] border border-white/5 break-inside-avoid relative overflow-hidden group hover:border-brand-500/20",
                t.large ? "lg:py-10" : ""
              )}
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-500/10 group-hover:text-brand-500/20 transition-colors" />
              
              <p className={cn(
                "text-slate-300 relative z-10 leading-relaxed mb-6 block",
                t.large ? "text-lg md:text-xl font-medium" : "text-base"
              )}>
                &quot;{t.quote}&quot;
              </p>

              <div className="w-full h-px bg-white/5 mb-6" />

              <div className="flex items-center gap-4 relative z-10">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-lg ring-2 ring-white/10",
                  t.color
                )}>
                  {t.initials}
                </div>
                <div>
                  <h5 className="text-white font-bold">{t.name}</h5>
                  <p className="text-sm text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
