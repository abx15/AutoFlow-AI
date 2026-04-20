import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Templates - AutoFlow AI',
  description: 'Pre-built workflow templates to get started quickly with AutoFlow AI.',
};

export default function TemplatesPage() {
  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Workflow <span className="text-brand-500">Templates</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with pre-built workflows and customize them for your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-surface border border-border rounded-lg p-6 hover:border-brand-500/30 transition-colors">
            <div className="w-12 h-12 bg-brand-500/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl"> Invoice</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Invoice Processing</h3>
            <p className="text-muted-foreground mb-4">Automatically process invoices, extract data, and update your CRM.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-brand-500/10 text-brand-400 rounded-full">Stripe</span>
              <span className="text-xs px-2 py-1 bg-brand-500/10 text-brand-400 rounded-full">CRM</span>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6 hover:border-brand-500/30 transition-colors">
            <div className="w-12 h-12 bg-brand-500/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl"> Lead</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Lead Management</h3>
            <p className="text-muted-foreground mb-4">Capture, qualify, and distribute leads automatically across your team.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-brand-500/10 text-brand-400 rounded-full">Forms</span>
              <span className="text-xs px-2 py-1 bg-brand-500/10 text-brand-400 rounded-full">Email</span>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6 hover:border-brand-500/30 transition-colors">
            <div className="w-12 h-12 bg-brand-500/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl"> Support</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Customer Support</h3>
            <p className="text-muted-foreground mb-4">Automate ticket routing, responses, and customer follow-ups.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-brand-500/10 text-brand-400 rounded-full">HelpDesk</span>
              <span className="text-xs px-2 py-1 bg-brand-500/10 text-brand-400 rounded-full">Slack</span>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6 hover:border-brand-500/30 transition-colors">
            <div className="w-12 h-12 bg-brand-500/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl"> Social</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Social Media Management</h3>
            <p className="text-muted-foreground mb-4">Schedule posts, analyze engagement, and automate responses.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-brand-500/10 text-brand-400 rounded-full">Twitter</span>
              <span className="text-xs px-2 py-1 bg-brand-500/10 text-brand-400 rounded-full">LinkedIn</span>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6 hover:border-brand-500/30 transition-colors">
            <div className="w-12 h-12 bg-brand-500/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl"> Ecom</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">E-commerce Automation</h3>
            <p className="text-muted-foreground mb-4">Manage inventory, orders, and customer communications automatically.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-brand-500/10 text-brand-400 rounded-full">Shopify</span>
              <span className="text-xs px-2 py-1 bg-brand-500/10 text-brand-400 rounded-full">WooCommerce</span>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6 hover:border-brand-500/30 transition-colors">
            <div className="w-12 h-12 bg-brand-500/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl"> HR</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">HR Onboarding</h3>
            <p className="text-muted-foreground mb-4">Streamline employee onboarding with automated workflows.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-brand-500/10 text-brand-400 rounded-full">HRIS</span>
              <span className="text-xs px-2 py-1 bg-brand-500/10 text-brand-400 rounded-full">Email</span>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Need a Custom Template?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team can help you build custom workflows tailored to your specific business needs.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-500 transition-colors">
              Contact Us
            </Link>
            <Link href="/docs" className="inline-flex items-center px-6 py-3 border border-border text-base font-medium rounded-md text-foreground bg-background hover:bg-surface-hover transition-colors">
              View Documentation
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
