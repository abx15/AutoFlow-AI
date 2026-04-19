"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Activity, 
  Code2, 
  Layers, 
  BarChart3,
  Bot,
  Globe,
  Lock
} from "lucide-react";

const features = [
  {
    title: "AI Agent Engine",
    description: "Built-in support for GPT-4o, Claude 3.5, and Gemini 1.5. Agents reason through complex tasks natively.",
    icon: Bot,
    color: "from-blue-500/20 to-blue-500/0",
    iconColor: "text-blue-500",
  },
  {
    title: "Multi-Tenant Security",
    description: "Enterprise-grade organization isolation. Your data and credentials are encrypted and scoped to your team.",
    icon: ShieldCheck,
    color: "from-purple-500/20 to-purple-500/0",
    iconColor: "text-purple-500",
  },
  {
    title: "Real-time Streaming",
    description: "Watch your agents think and execute in real-time. Live logs and status updates via native WebSockets.",
    icon: Activity,
    color: "from-green-500/20 to-green-500/0",
    iconColor: "text-green-500",
  },
  {
    title: "Developer First",
    description: "Powerful SDK, Stripe-like documentation, and a clean REST API. Built by developers, for developers.",
    icon: Code2,
    color: "from-orange-500/20 to-orange-500/0",
    iconColor: "text-orange-500",
  },
  {
    title: "10+ Integrations",
    description: "Connect Gmail, Slack, Notion, and HubSpot in clicks. Native connectors for the tools you already use.",
    icon: Layers,
    color: "from-sky-500/20 to-sky-500/0",
    iconColor: "text-sky-500",
  },
  {
    title: "Deep Analytics",
    description: "Track token usage, execution performance, and success rates with high-fidelity charts and reports.",
    icon: BarChart3,
    color: "from-pink-500/20 to-pink-500/0",
    iconColor: "text-pink-500",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest uppercase text-xs mb-4"
          >
            Powerful Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Everything you need to <br />
            <span className="text-muted-foreground">scale your AI workforce</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-3xl glass hover:bg-white/5 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl -z-10`} />
              
              <div className={`w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.iconColor}`}>
                <feature.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              
              <div className="mt-6 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                Learn more <Zap className="ml-1 w-3 h-3 fill-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
