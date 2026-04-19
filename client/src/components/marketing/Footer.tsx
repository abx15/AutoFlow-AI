"use client";

import Link from "next/link";
import { Zap, Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="text-primary-foreground fill-primary-foreground w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">AutoFlow <span className="text-primary">AI</span></span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
              Empowering businesses to automate the future with autonomous AI agents. 
              The most developer-friendly workflow platform.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors group">
                <Github className="w-5 h-5 group-hover:text-primary" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors group">
                <Twitter className="w-5 h-5 group-hover:text-primary" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors group">
                <Linkedin className="w-5 h-5 group-hover:text-primary" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-foreground/50">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/templates" className="hover:text-primary transition-colors">Templates</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-foreground/50">Developer</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/docs" className="hover:text-primary transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">SDK</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Examples</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Status</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-foreground/50">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-border flex flex-col md:row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground">
            © 2024 AutoFlow AI Inc. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
