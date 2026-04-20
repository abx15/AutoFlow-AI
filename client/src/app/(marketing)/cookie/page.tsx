import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy - AutoFlow AI',
  description: 'AutoFlow AI Cookie Policy - How we use cookies and similar technologies.',
};

export default function CookiePage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Cookie <span className="text-brand-500">Policy</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            This policy explains how AutoFlow AI uses cookies and similar technologies.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">What Are Cookies?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Cookies are small text files that are stored on your device when you visit a website. They help us:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Remember your preferences</li>
                  <li>Understand how you use our service</li>
                  <li>Provide personalized experiences</li>
                  <li>Maintain security and prevent fraud</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Types of Cookies We Use</h2>
              <div className="space-y-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Essential Cookies</h3>
                  <p className="text-muted-foreground mb-2">Required for the website to function properly.</p>
                  <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                    <li>Authentication and session management</li>
                    <li>Security and fraud prevention</li>
                    <li>Load balancing</li>
                  </ul>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Performance Cookies</h3>
                  <p className="text-muted-foreground mb-2">Help us understand how visitors interact with our website.</p>
                  <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                    <li>Analytics and usage statistics</li>
                    <li>Error monitoring</li>
                    <li>Performance optimization</li>
                  </ul>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Functional Cookies</h3>
                  <p className="text-muted-foreground mb-2">Enhance functionality and remember your preferences.</p>
                  <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                    <li>Theme and display preferences</li>
                    <li>Language settings</li>
                    <li>Remembered workflows and settings</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Cookies</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We may use third-party services that place cookies on your device:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment processors for secure transactions</li>
                  <li>Analytics services for usage insights</li>
                  <li>Customer support platforms</li>
                  <li>Integration partners for workflow connections</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Managing Cookies</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You can control cookies through:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Browser settings to block or delete cookies</li>
                  <li>Our cookie consent banner when available</li>
                  <li>Privacy settings in your account</li>
                </ul>
                <p className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-yellow-200">
                  Note: Blocking essential cookies may affect website functionality.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Cookie Duration</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Different cookies have different lifespans:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Session cookies: Deleted when you close your browser</li>
                  <li>Persistent cookies: Remain for a set period (typically 30 days to 1 year)</li>
                  <li>Authentication cookies: Match your session duration (7 days)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Accept or reject non-essential cookies</li>
                  <li>View what cookies are stored on your device</li>
                  <li>Delete cookies from your browser</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Updates to This Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We may update this cookie policy to reflect changes in our use of cookies or legal requirements.</p>
                <p>Any changes will be posted on this page with an updated revision date.</p>
                <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>If you have questions about our use of cookies, please contact us at:</p>
                <div className="bg-surface border border-border rounded-lg p-6">
                  <p>Email: privacy@autoflow.ai</p>
                  <p>Address: Made with love in India</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
