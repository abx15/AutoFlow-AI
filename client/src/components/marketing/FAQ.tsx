'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQS = [
  {
    q: "What exactly is AutoFlow AI?",
    a: "AutoFlow AI is an AI-powered workflow automation platform. You describe what you want to automate in plain English, connect a trigger (webhook, cron, or API call), and our AI agent handles the rest — calling tools, making decisions, and completing your task automatically. Think of it like Zapier, but with a real AI brain instead of rigid if-then logic."
  },
  {
    q: "Which AI models are available?",
    a: "We support Anthropic Claude 3.5 Sonnet (best for complex reasoning), OpenAI GPT-4o (great for structured tasks), and Google Gemini Pro (excellent for multi-modal tasks). You choose per workflow — or let us recommend based on your use case."
  },
  {
    q: "Do I need to write code?",
    a: "No. You describe your workflow in plain English. However, if you're a developer, our full REST API and JavaScript SDK let you integrate AutoFlow AI into your own applications programmatically."
  },
  {
    q: "How are tokens counted?",
    a: "Tokens are the units AI models use to process text. Each word is roughly 1-2 tokens. A typical workflow execution uses 500-2000 tokens. Our free plan includes 100,000 tokens/month which covers 50-200 workflow executions depending on complexity."
  },
  {
    q: "Can I use my own Anthropic/OpenAI API keys?",
    a: "On Pro and Enterprise plans, yes. You can connect your own API keys and they won't count against your AutoFlow token quota."
  },
  {
    q: "Is my data secure?",
    a: "Yes. All credentials are AES-256-GCM encrypted. Data is isolated per organization. We're GDPR compliant with full data export and deletion. JWT tokens expire in 15 minutes. Full audit log of all actions."
  },
  {
    q: "What happens when I hit my token quota?",
    a: "Your workflows pause automatically and you get a notification at 80% and 95% usage. You can upgrade your plan instantly, or wait for the monthly reset. We never silently charge overages."
  },
  {
    q: "Can I self-host AutoFlow AI?",
    a: "Yes! AutoFlow AI is open-source (MIT license). Clone the repo, run docker-compose up, and you're running your own instance. Full docs at our GitHub."
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Yes — 14 days free trial on the Pro plan, no credit card required. After the trial, you're moved to the free plan automatically (not charged) unless you upgrade."
  },
  {
    q: "What integrations are available?",
    a: "Native: Gmail, Slack, Notion, HubSpot, Airtable. Universal: HTTP Request tool connects to ANY REST API. Coming soon: Salesforce, Jira, Linear, Stripe webhooks."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="py-[80px] bg-[#08080F]">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-slate-400">
            Can&apos;t find what you&apos;re looking for? Reach out to us.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-1">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className="border-b border-white/5 last:border-0"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-6 flex items-center justify-between gap-4 text-left group"
                >
                  <span className={cn(
                    "text-lg font-bold transition-colors",
                    isOpen ? "text-brand-400" : "text-white group-hover:text-brand-300"
                  )}>
                    {faq.q}
                  </span>
                  <motion.div
                    initial={false}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className={cn(
                      "w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full transition-colors",
                      isOpen ? "bg-brand-500/20 text-brand-400" : "bg-white/5 text-slate-400 group-hover:bg-brand-500/10 group-hover:text-brand-300"
                    )}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-slate-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
