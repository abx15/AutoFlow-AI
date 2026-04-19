"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Github, Chrome, ArrowRight, Loader2, Mail, Lock, User, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Brand & Visuals */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-accent p-12 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-white/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-black/10 blur-[80px] rounded-full" />
        </div>

        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <Zap className="text-accent fill-accent w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">AutoFlow AI</span>
        </Link>

        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-white mb-6 leading-tight"
          >
            Start your journey <br />
            with the most powerful <br />
            AI workflows.
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
            <p className="text-white/60 mb-2">// Connect your first tool</p>
            <p className="mb-1"><span className="text-orange-300">client</span>.integrations.connect(<span className="text-green-300">'slack'</span>);</p>
            <p className="mb-1"><span className="text-orange-300">client</span>.integrations.connect(<span className="text-green-300">'notion'</span>);</p>
          </motion.div>
        </div>

        <div className="text-white/60 text-sm relative z-10">
          © 2024 AutoFlow AI Inc. All rights reserved.
        </div>
      </div>

      {/* Right Side: Register Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background">
        <div className="w-full max-w-[440px]">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Create an Account</h1>
            <p className="text-muted-foreground">
              Begin your 14-day free trial. No credit card required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="pl-10 h-11"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="orgName" 
                    placeholder="Acme Corp" 
                    className="pl-10 h-11"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com" 
                  className="pl-10 h-11"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 h-11"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex gap-1 pt-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full ${formData.password.length > i * 2 ? 'bg-primary' : 'bg-muted'}`} />
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 rounded border-muted-foreground outline-primary" 
                required 
              />
              <Label htmlFor="terms" className="text-xs font-medium text-muted-foreground">
                I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-md font-bold shadow-lg shadow-primary/20 mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
