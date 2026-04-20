import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SDK Documentation - AutoFlow AI',
  description: 'Official SDK documentation for AutoFlow AI integration.',
};

export default function SDKPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            SDK <span className="text-brand-500">Documentation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Official SDKs and libraries for AutoFlow AI integration.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">JavaScript/Node.js SDK</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Installation</h3>
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-sm mb-4">
                <code>npm install @autoflow/sdk</code>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Usage</h3>
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-sm">
                <pre>{`import { AutoFlowClient } from '@autoflow/sdk';

const client = new AutoFlowClient({
  apiKey: process.env.AUTOFLOW_API_KEY
});

const workflow = await client.createWorkflow({
  name: 'My Workflow',
  trigger: { type: 'webhook' },
  actions: [{ type: 'api_call', url: 'https://api.example.com' }]
});`}</pre>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Python SDK</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Installation</h3>
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-sm mb-4">
                <code>pip install autoflow-ai</code>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Usage</h3>
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-sm">
                <pre>{`from autoflow import AutoFlowClient

client = AutoFlowClient(
    api_key="your-api-key"
)

workflow = client.create_workflow(
    name="My Workflow",
    trigger={"type": "webhook"},
    actions=[{"type": "api_call", "url": "https://api.example.com"}]
)`}</pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
