"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Loader2, Building2, Mail, Lock, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    orgName: ""
  });
  const { register, isLoading } = useAuthStore();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.orgName) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await register(formData);
      toast.success("Account created successfully! Welcome aboard.");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left: Background Branding */}
      <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden flex-col p-12 text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl">
             <Zap className="text-primary w-7 h-7" />
          </div>
          <span className="text-3xl font-black tracking-tighter">AutoFlow AI</span>
        </Link>

        <div className="mt-auto relative z-10 space-y-6 max-w-lg">
          <div className="inline-block p-2 bg-white/10 rounded-lg backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest">
             v1.0 Developer Preview
          </div>
          <h2 className="text-5xl font-black leading-tight">Start Building <br /> AI-Native Workflows.</h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Join 2,000+ developers automating their business logic with our distributed agent engine.
          </p>
          <div className="pt-8 flex gap-8">
            <div className="space-y-1">
              <div className="text-2xl font-black">99.9%</div>
              <div className="text-[10px] uppercase font-bold opacity-60 italic">Uptime SLA</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black">&lt;50ms</div>
              <div className="text-[10px] uppercase font-bold opacity-60 italic">API Latency</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black">256-bit</div>
              <div className="text-[10px] uppercase font-bold opacity-60 italic">Encryption</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Register Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-24 py-12">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">Create Identity</h1>
            <p className="text-muted-foreground">Setup your organization and personal developer account.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Personal Details</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Full Name" 
                    className="h-14 pl-12 bg-muted/30 border-none rounded-2xl"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="Work Email" 
                    className="h-14 pl-12 bg-muted/30 border-none rounded-2xl"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Company Entity</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Organization Name" 
                    className="h-14 pl-12 bg-muted/30 border-none rounded-2xl"
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Credentials</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="Strong Password" 
                    className="h-14 pl-12 bg-muted/30 border-none rounded-2xl"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-2xl border border-dashed border-muted flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <p className="text-[10px] text-muted-foreground leading-snug">
                By creating an account, you agree to our 256-bit data encryption policy and Developer Terms of Service.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/95 shadow-xl shadow-primary/20 text-md font-black group"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  PROVISION ACCOUNT
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an active key? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
