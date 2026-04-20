import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing - AutoFlow AI',
  description: 'Simple, transparent pricing for AutoFlow AI workflow automation platform.',
};

export default function PricingPage() {
  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Simple <span className="text-brand-500">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, scale when ready. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-surface border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">Free</h3>
            <p className="text-3xl font-bold text-foreground mb-6">Rs 0<span className="text-lg font-normal text-muted-foreground">/mo</span></p>
            <ul className="space-y-3 mb-8 text-muted-foreground">
              <li className="flex items-center">100,000 tokens/month</li>
              <li className="flex items-center">3 active workflows</li>
              <li className="flex items-center">100 executions/month</li>
              <li className="flex items-center">1 team member</li>
              <li className="flex items-center">Webhook triggers</li>
            </ul>
            <Link href="/register" className="w-full inline-flex items-center justify-center px-6 py-3 border border-border text-base font-medium rounded-md text-foreground bg-background hover:bg-surface-hover transition-colors">
              Get Started
            </Link>
          </div>

          <div className="bg-surface border border-brand-500 rounded-lg p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-brand-500 text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Pro</h3>
            <p className="text-3xl font-bold text-foreground mb-6">Rs 4,999<span className="text-lg font-normal text-muted-foreground">/mo</span></p>
            <ul className="space-y-3 mb-8 text-muted-foreground">
              <li className="flex items-center">2,000,000 tokens/month</li>
              <li className="flex items-center">100 active workflows</li>
              <li className="flex items-center">10,000 executions/month</li>
              <li className="flex items-center">20 team members</li>
              <li className="flex items-center">All trigger types</li>
              <li className="flex items-center">Priority support</li>
            </ul>
            <Link href="/register" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-500 transition-colors">
              Start Free Trial
            </Link>
          </div>

          <div className="bg-surface border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">Enterprise</h3>
            <p className="text-3xl font-bold text-foreground mb-6">Custom</p>
            <ul className="space-y-3 mb-8 text-muted-foreground">
              <li className="flex items-center">Unlimited tokens</li>
              <li className="flex items-center">Unlimited workflows</li>
              <li className="flex items-center">Unlimited executions</li>
              <li className="flex items-center">Unlimited team members</li>
              <li className="flex items-center">Custom integrations</li>
              <li className="flex items-center">Dedicated support</li>
            </ul>
            <Link href="/contact" className="w-full inline-flex items-center justify-center px-6 py-3 border border-border text-base font-medium rounded-md text-foreground bg-background hover:bg-surface-hover transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Need help choosing?</h2>
          <p className="text-muted-foreground mb-8">
            Our team can help you find the perfect plan for your business needs.
          </p>
          <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-500 transition-colors">
            Talk to Sales
          </Link>
        </div>
      </div>
    </main>
  );
}
