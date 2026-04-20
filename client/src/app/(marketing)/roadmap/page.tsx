import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Roadmap - AutoFlow AI',
  description: 'See what\'s coming next in AutoFlow AI platform development.',
};

export default function RoadmapPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Product <span className="text-brand-500">Roadmap</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what we&apos;re building and what&apos;s coming next.
          </p>
        </div>

        <div className="space-y-12">
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h2 className="text-xl font-semibold text-foreground">Q2 2026</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>Advanced AI model integrations</li>
                <li>Visual workflow builder</li>
                <li>Enhanced analytics dashboard</li>
                <li>Mobile app release</li>
              </ul>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h2 className="text-xl font-semibold text-foreground">Q3 2026</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>Enterprise features</li>
                <li>Advanced security options</li>
                <li>Custom integrations marketplace</li>
                <li>Team collaboration tools</li>
              </ul>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <h2 className="text-xl font-semibold text-foreground">Q4 2026</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>AI-powered workflow suggestions</li>
                <li>Advanced automation features</li>
                <li>Global expansion</li>
                <li>API v2 release</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Have Feedback?</h2>
          <p className="text-muted-foreground mb-8">
            We&apos;d love to hear your ideas and suggestions for our roadmap.
          </p>
          <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-500 transition-colors">
            Share Your Ideas
          </Link>
        </div>
      </div>
    </main>
  );
}
