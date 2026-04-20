import Link from 'next/link';
import { Code, MessageCircle, Users, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#05050D] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          
          {/* Brand Col - takes 2 cols on mobile/tablet */}
          <div className="col-span-2 lg:col-span-1 lg:pr-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                A
              </div>
              <span className="text-xl font-black tracking-tight text-white">AutoFlow AI</span>
            </Link>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              AI-powered workflow automation for developers and teams who move fast.
            </p>
            <div className="flex items-center gap-3 mb-8">
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all">
                <Code className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all">
                <Users className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2] transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <div className="text-xs text-slate-600">
              Made with ❤️ in India
            </div>
          </div>

          {/* Product Col */}
          <div>
            <h4 className="text-[11px] font-black tracking-widest text-slate-500 uppercase mb-5">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#features" className="text-slate-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#demo" className="text-slate-400 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/templates" className="text-slate-400 hover:text-white transition-colors">Templates</Link></li>
              <li><Link href="/changelog" className="text-slate-400 hover:text-white transition-colors">Changelog</Link></li>
              <li><Link href="/roadmap" className="text-slate-400 hover:text-white transition-colors">Roadmap</Link></li>
              <li><Link href="/status" className="text-slate-400 hover:text-white transition-colors">Status Page</Link></li>
            </ul>
          </div>

          {/* Developers Col */}
          <div>
            <h4 className="text-[11px] font-black tracking-widest text-slate-500 uppercase mb-5">Developers</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/docs/api" className="text-slate-400 hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="/docs/sdk" className="text-slate-400 hover:text-white transition-colors">SDK Docs</Link></li>
              <li><Link href="/docs/quickstart" className="text-slate-400 hover:text-white transition-colors">Quick Start</Link></li>
              <li><Link href="/examples" className="text-slate-400 hover:text-white transition-colors">Examples</Link></li>
              <li><Link href="/docs/openapi" className="text-slate-400 hover:text-white transition-colors">OpenAPI Spec</Link></li>
              <li><a href="https://github.com/autoflow-ai" className="text-slate-400 hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Discord</a></li>
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="text-[11px] font-black tracking-widest text-slate-500 uppercase mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="text-slate-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/press" className="text-slate-400 hover:text-white transition-colors">Press</Link></li>
              <li><Link href="/partners" className="text-slate-400 hover:text-white transition-colors">Partners</Link></li>
            </ul>
          </div>

          {/* Support Col */}
          <div>
            <h4 className="text-[11px] font-black tracking-widest text-slate-500 uppercase mb-5">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/docs" className="text-slate-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/security" className="text-slate-400 hover:text-white transition-colors">Security</Link></li>
              <li><Link href="/report" className="text-slate-400 hover:text-white transition-colors">Report a Bug</Link></li>
            </ul>
          </div>

        </div>

        {/* Separator */}
        <div className="w-full h-px bg-white/5 mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>
            © {new Date().getFullYear()} AutoFlow AI. All rights reserved.
          </div>
          <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 font-mono text-xs">
            v1.0.0
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span>·</span>
            <Link href="/cookie" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
