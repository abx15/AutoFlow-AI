import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers - AutoFlow AI',
  description: 'Join our team and help build the future of workflow automation.',
};

export default function CareersPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Join <span className="text-brand-500">Our Team</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us build the future of workflow automation.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Open Positions</h2>
            <div className="space-y-6">
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Senior Frontend Developer</h3>
                <p className="text-muted-foreground mb-4">Remote · Full-time</p>
                <p className="text-muted-foreground mb-4">We are looking for an experienced frontend developer to help build our next-generation workflow platform.</p>
                <a href="mailto:careers@autoflow.ai" className="text-brand-500 hover:text-brand-400 transition-colors">
                  Apply Now
                </a>
              </div>

              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Backend Engineer</h3>
                <p className="text-muted-foreground mb-4">Remote · Full-time</p>
                <p className="text-muted-foreground mb-4">Join our backend team to build scalable infrastructure for AI-powered workflows.</p>
                <a href="mailto:careers@autoflow.ai" className="text-brand-500 hover:text-brand-400 transition-colors">
                  Apply Now
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Work With Us</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Remote First</h3>
                <p className="text-muted-foreground">Work from anywhere in the world with flexible hours.</p>
              </div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Competitive Benefits</h3>
                <p className="text-muted-foreground">Health insurance, equity, and learning budget.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
