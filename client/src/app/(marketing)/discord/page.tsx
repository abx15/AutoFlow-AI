import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discord Community - AutoFlow AI',
  description: 'Join our Discord community to connect with other AutoFlow AI users.',
};

export default function DiscordPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Join Our <span className="text-brand-500">Discord</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with thousands of AutoFlow AI users and get help from our community.
          </p>
        </div>

        <div className="space-y-12">
          <section className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Join Our Discord?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Get Help</h3>
                <p className="text-muted-foreground">Get instant help from our community and support team.</p>
              </div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Share Ideas</h3>
                <p className="text-muted-foreground">Share your workflows and get feedback from other users.</p>
              </div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Stay Updated</h3>
                <p className="text-muted-foreground">Get the latest updates and feature announcements first.</p>
              </div>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Join Our Community</h2>
            <div className="bg-surface border border-border rounded-lg p-8">
              <p className="text-muted-foreground mb-6">Click below to join our Discord server:</p>
              <a href="https://discord.gg/autoflow" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-500 transition-colors">
                Join Discord Server
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
