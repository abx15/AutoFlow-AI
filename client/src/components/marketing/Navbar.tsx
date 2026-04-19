'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Templates", href: "/#templates" },
    { name: "Docs", href: "/#docs" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-surface-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-brand-500 rounded p-1 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all animate-float" style={{ animationDuration: "4s" }}>
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">AutoFlow AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground hover:text-brand-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Link href="/login">
              <Button variant="ghost" className="hover:bg-surface-hover">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-brand-600 hover:bg-brand-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-surface-border">
                <SheetHeader>
                  <SheetTitle className="text-left font-bold tracking-tight text-foreground">Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium text-foreground py-2 border-b border-surface-border"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="flex flex-col space-y-4 pt-4">
                    <Link href="/login" className="w-full">
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link href="/register" className="w-full">
                      <Button className="w-full bg-brand-600 hover:bg-brand-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
