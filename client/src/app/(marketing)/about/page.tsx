import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - AutoFlow AI',
  description: 'Learn about AutoFlow AI - the leading AI-powered workflow automation platform for developers and teams.',
};

export default function AboutPage() {
  return (
    <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
              About <span className="text-brand-500">AutoFlow AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering developers and teams with intelligent workflow automation that adapts to your needs.
            </p>
          </div>

          <div className="grid gap-16">
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At AutoFlow AI, we&apos;re on a mission to democratize workflow automation. We believe that every developer 
                and team should have access to powerful AI-driven tools that make complex workflows simple, efficient, 
                and enjoyable to create and manage.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">What We Do</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">AI-Powered Automation</h3>
                  <p className="text-muted-foreground">
                    Our intelligent automation platform leverages cutting-edge AI to understand your workflow patterns 
                    and suggest optimizations automatically.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Developer First</h3>
                  <p className="text-muted-foreground">
                    Built by developers, for developers. We understand the challenges you face and design solutions 
                    that integrate seamlessly with your existing tools and workflows.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Enterprise Ready</h3>
                  <p className="text-muted-foreground">
                    From startups to enterprises, our platform scales with your needs while maintaining security, 
                    compliance, and performance standards.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Continuous Innovation</h3>
                  <p className="text-muted-foreground">
                    We&apos;re constantly evolving our platform with new features, integrations, and capabilities based on 
                    user feedback and emerging technologies.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Simplicity</h3>
                  <p className="text-muted-foreground">
                    Complex workflows made simple through intuitive design and intelligent automation.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Reliability</h3>
                  <p className="text-muted-foreground">
                    Enterprise-grade reliability with 99.9% uptime and robust error handling.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    Pushing the boundaries of what&apos;s possible with AI and automation.
                  </p>
                </div>
              </div>
            </section>

            <section className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">Join Our Journey</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                We&apos;re just getting started. Join thousands of developers and teams who are already using AutoFlow AI 
                to transform their workflows and accelerate their development.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/register" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-500 transition-colors">
                  Get Started Free
                </Link>
                <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-border text-base font-medium rounded-md text-foreground bg-background hover:bg-surface-hover transition-colors">
                  Contact Us
                </Link>
              </div>
            </section>
          </div>
        </div>
    </main>
  );
}
