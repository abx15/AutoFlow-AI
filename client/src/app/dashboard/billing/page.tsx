"use client";

import { 
  CreditCard, 
  Zap, 
  Check, 
  ArrowUpRight, 
  Clock, 
  Download,
  AlertCircle,
  ShieldCheck,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for testing and personal projects.",
    features: ["1,000 tokens/mo", "3 active workflows", "7-day log retention", "Community support"],
    current: false,
    color: "bg-muted/50"
  },
  {
    name: "Pro",
    price: "$49",
    description: "For startups and automated agencies.",
    features: ["100,000 tokens/mo", "Unlimited workflows", "30-day log retention", "Priority email support", "Custom webhooks"],
    current: true,
    color: "bg-primary text-white"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "High-volume processing for enterprises.",
    features: ["Unlimited tokens", "SLA guarantees", "Custom AI models", "Dedicated support", "Audit logs"],
    current: false,
    color: "bg-muted/50"
  }
];

export default function BillingPage() {
  const { org } = useAuthStore();

  return (
    <div className="space-y-10 pb-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black">Plan & Billing</h1>
          <p className="text-muted-foreground text-sm font-medium">Manage your subscription, view usage, and download invoices.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-4 px-6 group transition-all">
           <Zap className="w-8 h-8 text-primary shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform" />
           <div>
              <div className="text-[10px] font-black uppercase tracking-widest opacity-50">Current Plan</div>
              <div className="font-black text-primary italic uppercase tracking-tighter">{org?.plan || "PRO"} SUBSCRIPTION</div>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Usage Overview */}
        <Card className="lg:col-span-2 glass border-none rounded-[2.5rem] shadow-2xl overflow-hidden">
           <CardHeader className="p-10 pb-6">
              <CardTitle className="text-xl font-black">Monthly Token Usage</CardTitle>
              <CardDescription>Your current quota consumption across all active workflows.</CardDescription>
           </CardHeader>
           <CardContent className="px-10 pb-10 space-y-8">
              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <div className="space-y-1">
                       <span className="text-4xl font-black tracking-tighter">64,280</span>
                       <span className="text-muted-foreground font-bold tracking-tighter opacity-50 ml-2">/ 100,000 TOKENS</span>
                    </div>
                    <Badge variant="outline" className="h-6 font-bold bg-green-500/10 text-green-500 border-none">RESET IN 12 DAYS</Badge>
                 </div>
                 <div className="h-3 w-full bg-muted/30 rounded-full overflow-hidden">
                    <div className="h-full bg-primary shadow-lg shadow-primary/50 transition-all duration-1000" style={{ width: "64%" }} />
                 </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                 <UsageStat label="Workflow Runs" value="1,240" subValue="98.2% Success" />
                 <UsageStat label="Compute Time" value="4.2h" subValue="0.1s Avg Latency" />
                 <UsageStat label="Active Nodes" value="24" subValue="Across 3 Regions" />
              </div>
           </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="glass border-none rounded-[2.5rem] shadow-2xl overflow-hidden group">
           <CardHeader className="p-8">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground opacity-50">Default Payment</CardTitle>
           </CardHeader>
           <CardContent className="px-8 pb-8 space-y-6">
              <div className="p-6 rounded-3xl bg-muted/30 border border-white/5 relative group cursor-pointer hover:bg-muted/40 transition-colors">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-xl shrink-0">
                       <div className="w-8 h-5 bg-blue-600 rounded-sm" />
                    </div>
                    <div>
                       <div className="font-bold text-sm tracking-tight text-foreground">Visa ending in 4242</div>
                       <div className="text-[10px] uppercase font-black tracking-widest opacity-50">Expiry 12/28</div>
                    </div>
                 </div>
                 <Check className="absolute top-4 right-4 w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <Button variant="outline" className="w-full h-14 rounded-2xl border-dashed border-2 hover:bg-muted/10 font-bold gap-2">
                 <CreditCard className="w-4 h-4" />
                 Replace Payment Method
              </Button>
           </CardContent>
           <CardFooter className="px-8 pb-8 pt-0 flex gap-4">
              <div className="flex-1 p-4 bg-muted/20 rounded-2xl flex items-center gap-3">
                 <ShieldCheck className="w-5 h-5 text-green-500" />
                 <span className="text-[10px] font-bold leading-tight opacity-50">PCI Compliance Verified & Encrypted</span>
              </div>
           </CardFooter>
        </Card>
      </div>

      <div className="space-y-6">
         <h2 className="text-xl font-black italic">Available Tiers</h2>
         <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
               <Card key={plan.name} className={cn(
                  "border-none rounded-[3rem] shadow-2xl p-2 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500",
                  plan.current ? "bg-primary ring-4 ring-primary/20" : "glass"
               )}>
                  {plan.current && (
                     <div className="absolute top-8 -right-12 rotate-45 bg-white text-primary text-[10px] font-black py-1 px-12 shadow-xl whitespace-nowrap">
                        ACTIVE PLAN
                     </div>
                  )}
                  <div className="p-10 space-y-6">
                     <div className="space-y-2">
                        <Badge variant="outline" className={cn(
                           "rounded-full px-4 border-none font-black italic tracking-widest text-[10px]",
                           plan.current ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                        )}>
                           {plan.name.toUpperCase()}
                        </Badge>
                        <div className="flex items-baseline gap-1">
                           <span className={cn("text-4xl font-black tracking-tighter", plan.current ? "text-white" : "")}>{plan.price}</span>
                           <span className={cn("text-xs font-bold opacity-50", plan.current ? "text-white/70" : "")}>{plan.price !== "Custom" ? "/mo" : ""}</span>
                        </div>
                        <p className={cn("text-xs font-medium leading-relaxed", plan.current ? "text-white/80" : "text-muted-foreground")}>
                           {plan.description}
                        </p>
                     </div>

                     <div className="space-y-4">
                        {plan.features.map((f) => (
                           <div key={f} className="flex items-center gap-3">
                              <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0", plan.current ? "bg-white/20" : "bg-primary/10")}>
                                 <Check className={cn("w-3 h-3", plan.current ? "text-white" : "text-primary")} />
                              </div>
                              <span className={cn("text-xs font-bold tracking-tight", plan.current ? "text-white/90" : "text-foreground")}>{f}</span>
                           </div>
                        ))}
                     </div>

                     <Button className={cn(
                        "w-full h-14 rounded-2xl font-black text-[11px] tracking-[0.2em] shadow-xl",
                        plan.current ? "bg-white text-primary hover:bg-white/90" : "bg-foreground text-background"
                     )}>
                        {plan.current ? "MANAGE SUBSCRIPTION" : `UPGRADE TO ${plan.name.toUpperCase()}`}
                     </Button>
                  </div>
               </Card>
            ))}
         </div>
      </div>

      {/* Invoice History */}
      <Card className="glass border-none rounded-[2.5rem] shadow-2xl overflow-hidden">
         <CardHeader className="p-10">
            <div className="flex items-center gap-4">
               <Package className="w-8 h-8 text-muted-foreground opacity-50" />
               <CardTitle className="text-xl font-black">Invoice Archives</CardTitle>
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <div className="divide-y divide-border/50">
               {[
                  { date: "Oct 01, 2026", amount: "$49.00", id: "INV-2026-001", status: "Paid" },
                  { date: "Sep 01, 2026", amount: "$49.00", id: "INV-2026-002", status: "Paid" },
                  { date: "Aug 01, 2026", amount: "$49.00", id: "INV-2026-003", status: "Paid" },
               ].map((inv) => (
                  <div key={inv.id} className="p-8 flex items-center justify-between group hover:bg-muted/10 transition-colors">
                     <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center">
                           <Clock className="w-5 h-5 opacity-40" />
                        </div>
                        <div>
                           <div className="font-bold text-sm">{inv.date}</div>
                           <div className="text-[10px] uppercase font-black tracking-widest opacity-40">{inv.id}</div>
                        </div>
                     </div>
                     <div className="flex items-center gap-10">
                        <div className="text-right">
                           <div className="font-black text-sm">{inv.amount}</div>
                           <Badge variant="outline" className="h-5 text-[8px] font-black bg-green-500/10 text-green-500 border-none px-1.5">{inv.status}</Badge>
                        </div>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-muted/30 group-hover:bg-primary group-hover:text-white transition-all">
                           <Download className="w-4 h-4" />
                        </Button>
                     </div>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
    </div>
  );
}

function UsageStat({ label, value, subValue }: any) {
   return (
      <div className="space-y-1">
         <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{label}</div>
         <div className="text-xl font-black tracking-tighter">{value}</div>
         <div className="text-[10px] font-bold text-muted-foreground opacity-70 italic">{subValue}</div>
      </div>
   );
}
