import { PageHeader } from "@/components/shared/PageHeader";

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 min-h-screen">
      <PageHeader 
        title="Documentation" 
        description="Learn how to build and deploy AI workflows with AutoFlow AI."
      />
      
      <div className="mt-12 prose prose-invert max-w-none">
        <div className="glass p-8 rounded-xl border border-surface-border">
          <h2 className="text-2xl font-bold mb-4 text-white">Getting Started</h2>
          <p className="text-slate-400 mb-4">
            AutoFlow AI allows you to chain API calls and AI agents together using natural language. No more complex visual builders or writing boilerplate code.
          </p>
          <pre className="bg-[#0A0A12] p-4 rounded-lg font-mono text-sm border border-surface-border text-brand-400">
            <code>npm install @autoflow/sdk</code>
          </pre>
          
          <h3 className="text-xl font-bold mt-8 mb-4 text-white">Authentication</h3>
          <p className="text-slate-400 mb-4">
            Authenticate your requests using API keys obtained from your dashboard.
          </p>
          <pre className="bg-[#0A0A12] p-4 rounded-lg font-mono text-sm border border-surface-border text-brand-400">
            <code>{`const client = new AutoFlowClient({ apiKey: process.env.AUTOFLOW_API_KEY });`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
