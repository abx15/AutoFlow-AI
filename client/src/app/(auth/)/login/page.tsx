"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Github, Chrome, ArrowRight, Loader2, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Brand & Visuals */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-primary p-12 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-white/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-black/10 blur-[80px] rounded-full" />
        </div>

        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <Zap className="text-primary fill-primary w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">AutoFlow AI</span>
        </Link>

        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-white mb-6 leading-tight"
          >
            Join 10,000+ developers <br />
            building the future of <br />
            AI automation.
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 font-mono text-sm text-white/80"
          >
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
            </div>
            <p className="text-white/60 mb-2">// Run your first agent</p>
            <p className="mb-1"><span className="text-blue-300">import</span> {"{ AutoFlowAI }"} from <span className="text-green-300">'@autoflow/sdk'</span>;</p>
            <p className="mb-1"><span className="text-blue-300">const</span> client = <span className="text-blue-300">new</span> AutoFlowAI({"{ apiKey: '...' }"});</p>
            <p className="mb-1"><span className="text-blue-300">await</span> client.workflows.run(<span className="text-green-300">'wf_id'</span>);</p>
          </motion.div>
        </div>

        <div className="text-white/60 text-sm relative z-10">
          © 2024 AutoFlow AI Inc. All rights reserved.
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background">
        <div className="w-full max-w-[400px]">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
            <p className="text-muted-foreground leading-relaxed">
              Login to your account to manage your AI workforce.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com" 
                  className="pl-10 h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-md font-bold shadow-lg shadow-primary/20"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <>
                  Log In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button variant="outline" className="h-12 font-semibold">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </Button>
            <Button variant="outline" className="h-12 font-semibold">
              <Chrome className="mr-2 h-5 w-5 text-primary" />
              Google
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
