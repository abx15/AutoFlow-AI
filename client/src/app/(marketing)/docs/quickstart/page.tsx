import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quick Start - AutoFlow AI',
  description: 'Get started with AutoFlow AI in minutes.',
};

export default function QuickStartPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Quick <span className="text-brand-500">Start</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get up and running with AutoFlow AI in just a few minutes.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Step 1: Sign Up</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">Create your free account to get started.</p>
              <a href="/register" className="text-brand-500 hover:text-brand-400 transition-colors">
                Create Account
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Step 2: Create Your First Workflow</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">Use our visual builder or write natural language to create your first workflow.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Step 3: Connect Your Tools</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">Connect your favorite apps and services with our pre-built integrations.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Step 4: Go Live</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">Deploy your workflow and start automating your processes.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
