import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog - AutoFlow AI',
  description: 'Latest updates and improvements to AutoFlow AI platform.',
};

export default function ChangelogPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            <span className="text-brand-500">Changelog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest features and improvements.
          </p>
        </div>

        <div className="space-y-12">
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Version 3.0.0</h2>
              <span className="text-sm text-muted-foreground">April 20, 2026</span>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-lg font-medium text-foreground">New Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>AI-powered workflow generation</li>
                <li>Advanced error handling and retry logic</li>
                <li>Real-time execution monitoring</li>
                <li>Enhanced mobile experience</li>
              </ul>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Version 2.5.0</h2>
              <span className="text-sm text-muted-foreground">March 15, 2026</span>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-lg font-medium text-foreground">Improvements</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Performance optimizations</li>
                <li>New integrations added</li>
                <li>Improved dashboard UI</li>
                <li>Bug fixes and stability improvements</li>
              </ul>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Version 2.0.0</h2>
              <span className="text-sm text-muted-foreground">February 1, 2026</span>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-lg font-medium text-foreground">Major Update</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Complete platform redesign</li>
                <li>New workflow engine</li>
                <li>Enhanced security features</li>
                <li>Multi-language support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
