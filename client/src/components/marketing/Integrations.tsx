'use client';

import { motion } from 'framer-motion';

const ROW_1 = [
  "Gmail", "Slack", "Notion", "HubSpot", "Airtable",
  "GitHub", "Stripe", "Zapier", "Twilio", "Discord"
];

const ROW_2 = [
  "Salesforce", "Jira", "Trello", "Linear", "Intercom",
  "Mailchimp", "Shopify", "MySQL", "Redis", "Figma"
];

// Duplicate for seamless loop
const DUPLICATED_ROW_1 = [...ROW_1, ...ROW_1, ...ROW_1];
const DUPLICATED_ROW_2 = [...ROW_2, ...ROW_2, ...ROW_2];

export function Integrations() {
  return (
    <div className="py-[80px] bg-[#0A0A12] relative overflow-hidden">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 px-4">
        <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-4">
          Works with tools you already use
        </h3>
        <p className="text-lg text-slate-400">
          Native integrations + HTTP tool connects to anything
        </p>
      </div>

      {/* Scrollers */}
      <div className="relative max-w-[100vw] overflow-hidden flex flex-col gap-6">
        {/* Gradient Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0A0A12] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0A0A12] to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Left */}
        <div className="flex gap-4 w-max animate-scroll-left hover:pause-animation">
          {DUPLICATED_ROW_1.map((name, i) => (
            <div 
              key={`r1-${i}`}
              className="glass px-6 py-3 rounded-full border border-white/5 opacity-50 hover:opacity-100 hover:border-brand-500/50 hover:text-brand-400 transition-all cursor-default flex items-center justify-center min-w-[140px]"
            >
              <span className="font-bold text-white tracking-wide">{name}</span>
            </div>
          ))}
        </div>

        {/* Row 2 - Right */}
        <div className="flex gap-4 w-max animate-scroll-right hover:pause-animation">
          {DUPLICATED_ROW_2.map((name, i) => (
            <div 
              key={`r2-${i}`}
              className="glass px-6 py-3 rounded-full border border-white/5 opacity-50 hover:opacity-100 hover:border-purple-500/50 hover:text-purple-400 transition-all cursor-default flex items-center justify-center min-w-[140px]"
            >
              <span className="font-bold text-white tracking-wide">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="text-center mt-16 relative z-20">
        <a href="/docs" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-semibold transition-colors">
          + Connect anything with our HTTP Request tool
          <span className="text-lg leading-none">→</span>
        </a>
      </div>
      
    </div>
  );
}
