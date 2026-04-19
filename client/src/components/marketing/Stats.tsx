"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "API Calls Processed", value: 10, suffix: "M+", color: "text-blue-500" },
  { label: "Workflows Created", value: 50, suffix: "K+", color: "text-purple-500" },
  { label: "Uptime", value: 99.9, suffix: "%", color: "text-green-500" },
  { label: "Avg Execution Time", value: 2, suffix: "s", color: "text-orange-500", prefix: "< " },
];

export function Stats() {
  return (
    <section className="py-20 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="text-center p-8 rounded-3xl glass transition-transform hover:-translate-y-2"
    >
      <div className={`text-4xl lg:text-5xl font-black mb-2 ${stat.color} font-mono tracking-tighter`}>
        {stat.prefix}{stat.value % 1 === 0 ? Math.floor(count) : count.toFixed(1)}{stat.suffix}
      </div>
      <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
        {stat.label}
      </div>
    </motion.div>
  );
}
