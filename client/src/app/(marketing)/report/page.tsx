import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Report a Bug - AutoFlow AI',
  description: 'Report bugs and issues to help us improve AutoFlow AI.',
};

export default function ReportPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Report a <span className="text-brand-500">Bug</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us improve AutoFlow AI by reporting issues and bugs you encounter.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-surface border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Bug Report Form</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="bug-type" className="block text-sm font-medium text-foreground mb-2">
                    Bug Type
                  </label>
                  <select
                    id="bug-type"
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">Select bug type</option>
                    <option value="ui">UI/UX Issue</option>
                    <option value="functionality">Functionality Problem</option>
                    <option value="performance">Performance Issue</option>
                    <option value="security">Security Concern</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                    Bug Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Brief description of the issue"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                    Detailed Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Please describe the issue in detail..."
                  />
                </div>

                <div>
                  <label htmlFor="steps" className="block text-sm font-medium text-foreground mb-2">
                    Steps to Reproduce
                  </label>
                  <textarea
                    id="steps"
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                  />
                </div>

                <div>
                  <label htmlFor="expected" className="block text-sm font-medium text-foreground mb-2">
                    Expected Behavior
                  </label>
                  <textarea
                    id="expected"
                    rows={2}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="What you expected to happen..."
                  />
                </div>

                <div>
                  <label htmlFor="actual" className="block text-sm font-medium text-foreground mb-2">
                    Actual Behavior
                  </label>
                  <textarea
                    id="actual"
                    rows={2}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="What actually happened..."
                  />
                </div>

                <div>
                  <label htmlFor="browser" className="block text-sm font-medium text-foreground mb-2">
                    Browser & Version
                  </label>
                  <input
                    type="text"
                    id="browser"
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="e.g., Chrome 120.0.0.0"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Your Email (optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-brand-600 text-white rounded-md hover:bg-brand-500 transition-colors font-medium"
                >
                  Submit Bug Report
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Before Reporting</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Check if the issue has already been reported:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Search existing bug reports</li>
                  <li>Check our FAQ section</li>
                  <li>Review recent updates</li>
                </ul>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">What to Include</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Help us fix issues faster by including:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Clear, descriptive title</li>
                  <li>Steps to reproduce the issue</li>
                  <li>Screenshots or screen recordings</li>
                  <li>Browser and OS information</li>
                  <li>Console error messages</li>
                  <li>Expected vs actual behavior</li>
                </ul>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Response Time</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Our typical response times:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Security issues: Within 4 hours</li>
                  <li>Critical bugs: Within 24 hours</li>
                  <li>Major issues: Within 48 hours</li>
                  <li>Minor issues: Within 72 hours</li>
                </ul>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Alternative Reporting</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>You can also report bugs via:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> bugs@autoflow.ai</p>
                  <p><strong>GitHub:</strong> Create an issue on our repository</p>
                  <p><strong>Discord:</strong> #bug-reports channel</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-green-400">Bug Bounty Program</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Found a security vulnerability? Join our bug bounty program:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Rewards up to $10,000</li>
                  <li>Public recognition (optional)</li>
                  <li>Swag and merchandise</li>
                </ul>
                <p className="text-green-400">Email: security@autoflow.ai</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
