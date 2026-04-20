import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press - AutoFlow AI',
  description: 'Press releases and media resources for AutoFlow AI.',
};

export default function PressPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Press & <span className="text-brand-500">Media</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Latest news and announcements about AutoFlow AI.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Press Releases</h2>
            <div className="space-y-6">
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">AutoFlow AI Raises $5M Series A</h3>
                <p className="text-muted-foreground mb-2">April 15, 2026</p>
                <p className="text-muted-foreground mb-4">Leading AI workflow automation platform secures funding to expand globally.</p>
                <a href="#" className="text-brand-500 hover:text-brand-400 transition-colors">
                  Read More
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Media Kit</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">Download our media kit including logos, brand guidelines, and press materials.</p>
              <a href="#" className="text-brand-500 hover:text-brand-400 transition-colors">
                Download Media Kit
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
