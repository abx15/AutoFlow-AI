import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security - AutoFlow AI',
  description: 'AutoFlow AI Security - How we protect your data and maintain platform security.',
};

export default function SecurityPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            <span className="text-brand-500">Security</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade security to protect your data and workflows.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Security Commitment</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Security is at the core of everything we build at AutoFlow AI. We implement multiple layers of protection to ensure your data remains safe and your workflows run reliably.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Protection</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Encryption</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li> AES-256 encryption for data at rest</li>
                    <li> TLS 1.3 for data in transit</li>
                    <li> End-to-end encryption for sensitive workflows</li>
                    <li> Encrypted backups with secure key management</li>
                  </ul>
                </div>
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Data Access</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li> Zero-data retention for sensitive information</li>
                    <li> Role-based access control (RBAC)</li>
                    <li> Multi-factor authentication (MFA)</li>
                    <li> Regular access reviews and audits</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Infrastructure Security</h2>
              <div className="space-y-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Network Security</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li> DDoS protection and rate limiting</li>
                    <li> Web Application Firewall (WAF)</li>
                    <li> Private VPC for enterprise customers</li>
                    <li> Secure API endpoints with authentication</li>
                  </ul>
                </div>
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Compliance & Certifications</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li> SOC 2 Type II compliant</li>
                    <li> GDPR ready</li>
                    <li> ISO 27001 aligned practices</li>
                    <li> Regular third-party security audits</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Application Security</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Secure Development</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li> Secure coding practices</li>
                    <li> Regular code reviews and testing</li>
                    <li> Dependency vulnerability scanning</li>
                    <li> Static and dynamic analysis</li>
                  </ul>
                </div>
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Runtime Protection</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li> Input validation and sanitization</li>
                    <li> SQL injection prevention</li>
                    <li> XSS and CSRF protection</li>
                    <li> Secure session management</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Monitoring & Incident Response</h2>
              <div className="space-y-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">24/7 Monitoring</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li> Real-time security monitoring</li>
                    <li> Automated threat detection</li>
                    <li> Log aggregation and analysis</li>
                    <li> Anomaly detection systems</li>
                  </ul>
                </div>
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Incident Response</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li> 24/7 security team on-call</li>
                    <li> Rapid incident response procedures</li>
                    <li> Regular security drills and training</li>
                    <li> Transparent incident communication</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Security Responsibilities</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>While we provide robust security measures, you also play a crucial role in keeping your account secure:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use strong, unique passwords</li>
                  <li>Enable multi-factor authentication</li>
                  <li>Regularly review your account activity</li>
                  <li>Keep your contact information up to date</li>
                  <li>Secure your API keys and credentials</li>
                  <li>Follow principle of least privilege</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Vulnerability Disclosure</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>If you discover a security vulnerability, please report it to us responsibly:</p>
                <div className="bg-surface border border-border rounded-lg p-6">
                  <p className="mb-2">Email: security@autoflow.ai</p>
                  <p className="text-sm">We typically respond within 24 hours and will work with you to address any issues.</p>
                </div>
                <p className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-200">
                  We offer a bug bounty program for qualified security researchers.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Security Updates</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We continuously improve our security posture through:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Regular security assessments and penetration testing</li>
                  <li>Keeping dependencies up to date</li>
                  <li>Implementing new security technologies</li>
                  <li>Following industry best practices and standards</li>
                </ul>
                <p className="text-sm">Last security review: {new Date().toLocaleDateString()}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
