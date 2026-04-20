import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Reference - AutoFlow AI',
  description: 'Complete API documentation for AutoFlow AI workflow automation platform.',
};

export default function APIReferencePage() {
  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            API <span className="text-brand-500">Reference</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete documentation for integrating AutoFlow AI into your applications.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Getting Started</h2>
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Authentication</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>All API requests require authentication using your API key:</p>
                  <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-sm">
                    <p>Authorization: Bearer your-api-key-here</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Base URL</h2>
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="space-y-2">
                  <p className="font-mono text-sm">https://api.autoflow.ai/v1</p>
                  <p className="text-muted-foreground text-sm">Use this base URL for all API endpoints.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Endpoints</h2>
              <div className="space-y-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">POST /workflows</h3>
                  <p className="text-muted-foreground mb-4">Create a new workflow</p>
                  <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-sm mb-4">
                    <pre>{`{
  "name": "Invoice Processing",
  "trigger": {
    "type": "webhook",
    "event": "invoice.paid"
  },
  "actions": [
    {
      "type": "api_call",
      "url": "https://api.crm.com/contacts",
      "method": "POST"
    }
  ]
}`}</pre>
                  </div>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">GET /workflows</h3>
                  <p className="text-muted-foreground mb-4">List all workflows</p>
                  <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-sm">
                    <p>curl -X GET "https://api.autoflow.ai/v1/workflows" -H "Authorization: Bearer your-api-key"</p>
                  </div>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">POST /workflows/:id/execute</h3>
                  <p className="text-muted-foreground mb-4">Execute a workflow manually</p>
                  <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-sm">
                    <p>curl -X POST "https://api.autoflow.ai/v1/workflows/123/execute" -H "Authorization: Bearer your-api-key"</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Rate Limits</h2>
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="space-y-4 text-muted-foreground">
                  <p>API requests are rate limited to ensure fair usage:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Free Plan: 100 requests per hour</li>
                    <li>Starter Plan: 1,000 requests per hour</li>
                    <li>Pro Plan: 10,000 requests per hour</li>
                    <li>Enterprise: Custom limits</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">SDK & Libraries</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">JavaScript/Node.js</h3>
                  <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-sm">
                    <p>npm install @autoflow-ai/sdk</p>
                  </div>
                </div>
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Python</h3>
                  <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-sm">
                    <p>pip install autoflow-ai</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
