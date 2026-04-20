import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partners - AutoFlow AI',
  description: 'Partner with AutoFlow AI to deliver cutting-edge workflow automation solutions.',
};

export default function PartnersPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Partner <span className="text-brand-500">With Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our partner ecosystem and grow together.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Partner With AutoFlow AI</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Revenue Share</h3>
                <p className="text-muted-foreground">Earn competitive commissions on referrals.</p>
              </div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Co-Marketing</h3>
                <p className="text-muted-foreground">Joint marketing campaigns and events.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Become a Partner</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">Ready to partner with us? Get in touch to learn more.</p>
              <a href="/contact" className="text-brand-500 hover:text-brand-400 transition-colors">
                Contact Partnership Team
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
