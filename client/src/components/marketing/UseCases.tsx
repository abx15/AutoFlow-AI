'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type BaseUseCase = {
  id: string;
  label: string;
  result: string;
  steps: string[];
};

const USE_CASES: BaseUseCase[] = [
  {
    id: 'sales',
    label: 'Sales',
    result: 'Response time: 2 minutes → 2 seconds',
    steps: [
      '🔗 Webhook received from contact form',
      '🧠 AI extracts lead name, email, company, intent',
      '📊 Lead saved to CRM via API',
      '📧 Personalized welcome email drafted + sent by AI',
      '💬 Sales team notified on Slack with lead summary',
      '📋 Follow-up task created in project tool',
    ]
  },
  {
    id: 'support',
    label: 'Support',
    result: '60% of tickets auto-resolved first touch',
    steps: [
      '🎫 Support ticket webhook received',
      '🧠 AI reads ticket + analyzes sentiment + urgency',
      '🏷️ Auto-assigns category and priority',
      '✍️ AI drafts response for agent review',
      '📧 Draft sent to support inbox',
      '⚡ Critical tickets escalated immediately to manager',
    ]
  },
  {
    id: 'operations',
    label: 'Operations',
    result: '3 hours of manual work eliminated daily',
    steps: [
      '⏰ Cron trigger: every day at 9 AM',
      '🌐 HTTP request pulls data from 3 sources',
      '🧠 AI synthesizes data into executive summary',
      '📄 PDF report generated with charts',
      '📧 Report emailed to leadership team',
      '💾 Report archived in company drive',
    ]
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    result: 'Zero manual order processing',
    steps: [
      '🛍️ Order webhook from Shopify/WooCommerce',
      '🧠 AI processes order details',
      '📦 Inventory check + low stock alert',
      '✅ Fulfillment notification sent to warehouse',
      '📧 Order confirmation + tracking email to customer',
      '⭐ Review request email scheduled for day +7',
    ]
  },
  {
    id: 'hr',
    label: 'HR',
    result: 'Onboarding time: 1 day → 2 hours',
    steps: [
      '👤 New hire added to HR system webhook',
      '🧠 AI personalizes onboarding plan',
      '🔑 Accounts created via APIs (Slack, Notion, GitHub)',
      '📧 Welcome email + first-week schedule sent',
      '👋 Team introduction messages sent',
      '✅ 30-day checklist created in project tool',
    ]
  }
];

export function UseCases() {
  const [activeTab, setActiveTab] = useState(USE_CASES[0].id);
  const activeCase = USE_CASES.find(uc => uc.id === activeTab)!;

  return (
    <div className="py-[100px] bg-[#08080F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-black text-brand-500 uppercase tracking-[0.3em] mb-4">USE CASES</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            Built for every team in your company
          </h3>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto custom-scrollbar gap-2 mb-12 pb-4 justify-start md:justify-center">
          {USE_CASES.map((uc) => (
            <button
              key={uc.id}
              onClick={() => setActiveTab(uc.id)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all relative",
                activeTab === uc.id 
                  ? "text-white bg-white/10" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              {activeTab === uc.id && (
                <motion.div 
                  layoutId="activeUseCaseTab"
                  className="absolute inset-0 rounded-full border border-brand-500/50 bg-brand-500/10 -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {uc.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="glass rounded-[2rem] border border-white/5 p-8 md:p-12 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Column: Steps */}
              <div>
                <h4 className="text-xl font-bold text-white mb-6">Here&apos;s exactly what happens:</h4>
                <div className="space-y-4">
                  {activeCase.steps.map((step, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 font-black text-sm mt-0.5">
                        {index + 1}
                      </div>
                      <div className="pt-1.5 text-slate-300">
                        {step}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: activeCase.steps.length * 0.1 + 0.4 }}
                  className="mt-10 p-4 rounded-xl bg-green-500/10 border border-green-500/20 inline-flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 font-bold">Result: {activeCase.result}</span>
                </motion.div>
              </div>

              {/* Right Column: Visual Flowchart */}
              <div className="relative h-full min-h-[400px] flex items-center justify-center bg-black/40 rounded-2xl border border-white/5 p-8">
                {/* Simplified Flowchart visualization */}
                <div className="flex flex-col items-center gap-4 relative w-full max-w-sm">
                  {/* Connecting Line */}
                  <div className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-brand-500/50 via-purple-500/50 to-brand-500/50" />
                  
                  {activeCase.steps.slice(0, 4).map((_, i) => (
                    <motion.div
                      key={`visual-${i}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.2 + 0.3 }}
                      className="relative z-10 w-full p-4 rounded-xl glass border border-white/10 flex items-center justify-between"
                    >
                       <div className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-sm">
                         {i === 0 ? '⚡' : i === 1 ? '🧠' : i === 2 ? '⚙️' : '✅'}
                       </div>
                       <div className="flex-1 px-4 h-2 bg-white/5 rounded-full mx-4 overflow-hidden">
                          <motion.div 
                             initial={{ x: '-100%' }}
                             animate={{ x: '100%' }}
                             transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                             className="w-full h-full bg-brand-500/50 blur-[2px]"
                          />
                       </div>
                       <ChevronRight className="w-4 h-4 text-slate-500" />
                    </motion.div>
                  ))}
                  {activeCase.steps.length > 4 && (
                    <div className="relative z-10 glass px-6 py-2 rounded-full border border-white/10 text-xs text-slate-400">
                      + {activeCase.steps.length - 4} more steps
                    </div>
                  )}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
