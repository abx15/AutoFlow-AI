import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Status - AutoFlow AI',
  description: 'Real-time status and uptime information for AutoFlow AI services.',
};

export default function StatusPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            System <span className="text-brand-500">Status</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time status and performance metrics.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Overall Status</h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400">All Systems Operational</span>
              </div>
            </div>
            <div className="text-muted-foreground">
              <p>Uptime: 99.99% over the last 30 days</p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Services</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>API</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Dashboard</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Workflow Engine</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm">Operational</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Incidents</h2>
            <div className="text-muted-foreground">
              <p>No incidents reported in the last 30 days.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
