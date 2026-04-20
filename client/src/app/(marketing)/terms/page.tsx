import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - AutoFlow AI',
  description: 'AutoFlow AI Terms of Service - Rules and guidelines for using our platform.',
};

export default function TermsPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Terms of <span className="text-brand-500">Service</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            By using AutoFlow AI, you agree to these terms and conditions.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>By accessing and using AutoFlow AI, you accept and agree to be bound by the terms and provision of this agreement.</p>
                <p>If you do not agree to abide by the above, please do not use this service.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Description of Service</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>AutoFlow AI is an AI-powered workflow automation platform that enables users to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create and manage automated workflows</li>
                  <li>Integrate with third-party services and APIs</li>
                  <li>Process and transform data automatically</li>
                  <li>Monitor workflow execution and performance</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">User Accounts</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>To use our service, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be at least 18 years old</li>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Notify us immediately of unauthorized use</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Acceptable Use</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You agree to use AutoFlow AI only for lawful purposes. You may not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful or offensive content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use the service for spam or malicious activities</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Data and Content</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You retain ownership of your data and content. However:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You grant us license to use your data to provide the service</li>
                  <li>We may analyze anonymized usage data for improvement</li>
                  <li>You are responsible for backing up your important data</li>
                  <li>We may remove content that violates these terms</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Service Availability</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We strive to maintain high service availability but do not guarantee uninterrupted service.</p>
                <p>We may temporarily suspend or terminate the service for maintenance, updates, or other operational reasons.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>To the maximum extent permitted by law, AutoFlow AI shall not be liable for any indirect, incidental, or consequential damages.</p>
                <p>Our total liability for any claims shall not exceed the amount paid by you for the service in the preceding 12 months.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Termination</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We may terminate or suspend your account immediately for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violation of these terms</li>
                  <li>Fraudulent or illegal activities</li>
                  <li>Non-payment of fees (if applicable)</li>
                </ul>
                <p>You may terminate your account at any time through your account settings.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.</p>
                <p>Your continued use of the service constitutes acceptance of any modifications.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>If you have questions about these Terms of Service, please contact us at:</p>
                <div className="bg-surface border border-border rounded-lg p-6">
                  <p>Email: legal@autoflow.ai</p>
                  <p>Address: Made with love in India</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>These terms shall be governed by and construed in accordance with the laws of India.</p>
                <p>Any disputes will be resolved through binding arbitration in accordance with Indian arbitration laws.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
