"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: { monthly: "₹0", yearly: "₹0" },
    description: "Perfect for testing and small personal projects.",
    features: [
      "100K tokens / month",
      "3 active workflows",
      "100 executions / month",
      "Community support",
      "Basic analytics",
    ],
    cta: "Start for Free",
    popular: false,
  },
  {
    name: "Starter",
    price: { monthly: "₹999", yearly: "₹799" },
    description: "For developers and growing automations.",
    features: [
      "500K tokens / month",
      "20 active workflows",
      "1,000 executions / month",
      "Email support",
      "Webhook triggers",
      "Standard integrations",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: "₹4,999", yearly: "₹3,999" },
    description: "Scale your AI-first business with power.",
    features: [
      "2M tokens / month",
      "100 active workflows",
      "10,000 executions / month",
      "Priority support",
      "Custom AI models",
      "Advanced analytics",
      "Dedicated account manager",
    ],
    cta: "Go Pro",
    popular: true,
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-24 bg-background relative" id="pricing">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            Simple, Transparent <span className="text-primary">Pricing</span>
          </motion.h2>
          <p className="text-muted-foreground mb-8">Choose the plan that fits your execution needs.</p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={cn("text-sm font-medium", !isYearly ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 rounded-full bg-border relative transition-colors hover:bg-border/80"
            >
              <div className={cn(
                "absolute top-1 left-1 w-4 h-4 rounded-full bg-primary transition-transform",
                isYearly ? "translate-x-6" : "translate-x-0"
              )} />
            </button>
            <span className={cn("text-sm font-medium", isYearly ? "text-foreground" : "text-muted-foreground")}>
              Yearly <span className="text-green-500 font-bold ml-1">(-20%)</span>
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative p-8 rounded-3xl glass transition-all duration-300",
                tier.popular ? "border-primary shadow-2xl shadow-primary/10 scale-105 z-10" : "hover:-translate-y-2"
              )}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{isYearly ? tier.price.yearly : tier.price.monthly}</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={tier.popular ? "default" : "outline"}
                className={cn("w-full h-12 text-md", tier.popular && "shadow-lg shadow-primary/20")}
              >
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
