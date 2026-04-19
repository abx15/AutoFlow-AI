'use client';

import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const STATS = [
  { value: 10, suffix: 'M+', label: 'API Calls Processed', decimals: 0 },
  { value: 50, suffix: ',000+', label: 'Workflows Created', decimals: 0 },
  { value: 99.9, suffix: '%', label: 'Uptime This Year', decimals: 1 },
  { prefix: '< ', value: 2, suffix: 's', label: 'Average Execution Time', decimals: 0 }
];

export function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div className="py-[100px] bg-[#05050A] relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
          
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center pt-8 sm:pt-0"
            >
              <div className="text-[clamp(36px,5vw,60px)] font-black leading-none bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent mb-3">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    decimals={stat.decimals}
                    prefix={stat.prefix || ''}
                    suffix={stat.suffix || ''}
                    useEasing={true}
                  />
                ) : (
                  <span>{stat.prefix || ''}0{stat.suffix || ''}</span>
                )}
              </div>
              <div className="text-slate-400 text-base font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
}
