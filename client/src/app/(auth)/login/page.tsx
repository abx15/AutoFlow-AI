"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Loader2, ShieldCheck, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
      toast.success("Welcome back to AutoFlow AI!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left: Login Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-24">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-2 group mb-8">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <Zap className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter">AutoFlow AI</span>
            </Link>
            <h1 className="text-4xl font-black tracking-tight">Access Control</h1>
            <p className="text-muted-foreground">Sign in to manage your AI workflows and agents.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
               <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="h-14 pl-12 bg-muted/30 border-none rounded-2xl focus:ring-2 focus:ring-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
               </div>
            </div>
            <div className="space-y-2">
               <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="h-14 pl-12 bg-muted/30 border-none rounded-2xl focus:ring-2 focus:ring-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
               </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-muted bg-muted/30 text-primary focus:ring-primary" />
                <span className="text-muted-foreground font-medium">Keep me active</span>
              </label>
              <Link href="#" className="font-bold text-primary hover:underline">Forgot password?</Link>
            </div>
            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/95 shadow-xl shadow-primary/20 text-md font-bold group"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  SIGN IN TO ENGINE
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have access yet? <Link href="/register" className="text-primary font-bold hover:underline">Request an API Key</Link>
          </p>
        </div>
      </div>

      {/* Right: Technical Visual */}
      <div className="hidden lg:flex flex-1 bg-muted/30 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative z-10 w-full max-w-lg p-12 glass rounded-[2.5rem] border-none shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="text-primary w-6 h-6" />
            </div>
            <div>
              <div className="font-black text-lg">Secure Gateway v1.0</div>
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest">Connection: AES-256 Auth</div>
            </div>
          </div>
          <div className="space-y-4 font-mono text-xs text-primary/60">
            <div className="flex gap-2">
              <span className="opacity-40">09:12:01</span>
              <span>&gt; INITIALIZING HANDSHAKE...</span>
            </div>
            <div className="flex gap-2">
              <span className="opacity-40">09:12:02</span>
              <span>&gt; VERIFYING SSL CERTIFICATE... <span className="text-green-500">[OK]</span></span>
            </div>
            <div className="flex gap-2">
              <span className="opacity-40">09:12:03</span>
              <span>&gt; LOADING ENCRYPTION MODULE...</span>
            </div>
            <div className="flex gap-2">
              <span className="opacity-40">09:12:04</span>
              <span>&gt; READY FOR SECURE INPUT.</span>
            </div>
          </div>
          <div className="mt-12 p-8 bg-muted/50 rounded-3xl border border-white/5">
            <p className="italic text-muted-foreground text-sm leading-relaxed">
              "Scaling our AI agents was a nightmare until AutoFlow AI. The integrated dashboard gives us full visibility into every reasoning step."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-300" />
              <div className="text-[10px] font-black uppercase tracking-widest">CTO @ FutureScale Labs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
