'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function CTASection() {
  return (
    <div className="relative py-32 overflow-hidden border-y border-brand-500/20">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/15 to-purple-500/15 pointer-events-none" />
      
      {/* Particles Effect (CSS specific) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.3 + 0.1,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `-${Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(40px,6vw,72px)] font-black text-white leading-[1.1] tracking-tighter mb-6"
        >
          Start automating today
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Join thousands of developers building smarter workflows.<br className="hidden md:block"/>
          <span className="text-white font-semibold">Free forever — no credit card required.</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link href="/register">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-brand-600 to-purple-600 shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] hover:scale-105 transition-all active:scale-95">
              Create Free Account →
            </button>
          </Link>
          <Link href="/docs">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95">
              View Full Documentation
            </button>
          </Link>
        </motion.div>

        {/* Avatar Stack + Social Proof */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-400 font-medium"
        >
          <div className="flex -space-x-3">
            {['bg-blue-500', 'bg-orange-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500'].map((color, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-10 h-10 rounded-full border-2 border-[#090913] flex items-center justify-center text-white text-xs font-black shadow-lg",
                  color
                )}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span>Join 10,000+ developers already using AutoFlow AI</span>
        </motion.div>

      </div>
    </div>
  );
}
