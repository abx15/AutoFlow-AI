import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OpenAPI Spec - AutoFlow AI',
  description: 'OpenAPI specification for AutoFlow AI REST API.',
};

export default function OpenAPIPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            OpenAPI <span className="text-brand-500">Specification</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete API specification for AutoFlow AI integration.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">API Specification</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">Download the complete OpenAPI specification:</p>
              <div className="flex gap-4">
                <a href="/api/openapi.json" className="text-brand-500 hover:text-brand-400 transition-colors">
                  Download JSON
                </a>
                <a href="/api/openapi.yaml" className="text-brand-500 hover:text-brand-400 transition-colors">
                  Download YAML
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Interactive Documentation</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">Explore our interactive API documentation:</p>
              <a href="/docs/api" className="text-brand-500 hover:text-brand-400 transition-colors">
                View API Docs
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
