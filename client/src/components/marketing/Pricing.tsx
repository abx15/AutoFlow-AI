'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Free',
    badge: 'Perfect to start',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { text: '100,000 tokens/month', included: true },
      { text: '3 active workflows', included: true },
      { text: '100 executions/month', included: true },
      { text: '1 team member', included: true },
      { text: 'Webhook + Manual triggers', included: true },
      { text: '7-day execution history', included: true },
      { text: 'Cron schedules', included: false },
      { text: 'Advanced analytics', included: false },
    ],
    cta: 'Get Started Free →',
    ctaStyle: 'ghost'
  },
  {
    name: 'Starter',
    badge: 'For growing teams',
    monthlyPrice: 999,
    yearlyPrice: 799,
    features: [
      { text: '500,000 tokens/month', included: true },
      { text: '20 active workflows', included: true },
      { text: '1,000 executions/month', included: true },
      { text: '5 team members', included: true },
      { text: 'All trigger types', included: true },
      { text: 'Email support', included: true },
      { text: '30-day history', included: true },
      { text: 'Full API access', included: true },
      { text: 'Custom AI models', included: false },
    ],
    cta: 'Start Starter →',
    ctaStyle: 'outline'
  },
  {
    name: 'Pro',
    badge: 'Most Popular',
    monthlyPrice: 4999,
    yearlyPrice: 3999,
    isFeatured: true,
    features: [
      { text: '2,000,000 tokens/month', included: true },
      { text: '100 active workflows', included: true },
      { text: '10,000 executions/month', included: true },
      { text: '20 team members', included: true },
      { text: 'All 3 AI models', included: true },
      { text: 'Priority support', included: true },
      { text: '90-day history', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Data export', included: true },
    ],
    cta: 'Start Pro →',
    ctaStyle: 'gradient'
  }
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div id="pricing" className="py-[100px] bg-[#05050A]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-black text-brand-500 uppercase tracking-[0.3em] mb-4">PRICING</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
            Start free. Scale when ready.
          </h3>
          <p className="text-lg text-slate-400">
            No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-16">
          <div className="relative inline-flex items-center p-1 bg-white/5 rounded-full border border-white/10">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "relative z-10 px-6 py-2.5 text-sm font-bold rounded-full transition-colors",
                !isYearly ? "text-white" : "text-slate-400 hover:text-white"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "relative z-10 px-6 py-2.5 text-sm font-bold rounded-full transition-colors flex items-center gap-2",
                isYearly ? "text-white" : "text-slate-400 hover:text-white"
              )}
            >
              Yearly
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-black bg-green-500/20 text-green-400 border border-green-500/30">
                Save 20%
              </span>
            </button>
            {/* Sliding background */}
            <motion.div
              layout
              className="absolute left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-brand-500 rounded-full"
              animate={{
                x: isYearly ? "100%" : "0%"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "relative glass rounded-[2rem] p-8",
                plan.isFeatured 
                  ? "border-2 border-brand-500/40 bg-brand-500/5 shadow-[0_0_40px_rgba(99,102,241,0.15)] md:-my-6 animate-[pulse-glow_3s_infinite]" 
                  : "border border-white/5 hover:border-white/10"
              )}
            >
              {plan.isFeatured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-500 to-purple-500 text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                  {plan.badge}
                </div>
              )}
              
              {!plan.isFeatured && plan.badge && (
                <div className="mb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {plan.badge}
                </div>
              )}

              <h4 className="text-2xl font-black text-white mb-2">{plan.name}</h4>
              
              <div className="h-16 flex items-baseline mb-6">
                <span className="text-4xl font-black text-white">₹</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="text-5xl font-black text-white mx-1 tracking-tighter"
                  >
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </motion.span>
                </AnimatePresence>
                <span className="text-slate-400 font-medium">/mo</span>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-brand-400 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    )}
                    <span className={cn(
                      "text-sm font-medium",
                      feature.included ? "text-slate-200" : "text-slate-500"
                    )}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/register" className="block w-full">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full py-4 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                    plan.ctaStyle === 'ghost' 
                      ? "bg-white/5 hover:bg-white/10 text-white border border-white/5" 
                      : plan.ctaStyle === 'outline'
                        ? "bg-transparent hover:bg-brand-500/10 text-brand-400 border border-brand-500/50"
                        : "bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                  )}
                >
                  {plan.cta}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
