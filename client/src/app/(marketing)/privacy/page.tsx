import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - AutoFlow AI',
  description: 'AutoFlow AI Privacy Policy - How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Privacy <span className="text-brand-500">Policy</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and email address</li>
                  <li>Account credentials</li>
                  <li>Workflow data and configurations</li>
                  <li>Usage analytics and performance data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We use the information we collect to provide, maintain, and improve our services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and operate AutoFlow AI services</li>
                  <li>Process and execute workflows</li>
                  <li>Send technical notifications and updates</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze usage patterns</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We implement appropriate security measures to protect your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AES-256 encryption for data at rest</li>
                  <li>TLS 1.3 for data in transit</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Zero-data retention policy for sensitive information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Delete your account and data</li>
                  <li>Export your data</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>If you have questions about this Privacy Policy, please contact us at:</p>
                <div className="bg-surface border border-border rounded-lg p-6">
                  <p>Email: privacy@autoflow.ai</p>
                  <p>Address: Made with love in India</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Policy Updates</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
                <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
