import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Examples - AutoFlow AI',
  description: 'Code examples and tutorials for AutoFlow AI integration.',
};

export default function ExamplesPage() {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Code <span className="text-brand-500">Examples</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practical examples and tutorials for AutoFlow AI.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">JavaScript Examples</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Create a Simple Workflow</h3>
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-sm">
                <pre>{`const workflow = await client.createWorkflow({
  name: "Email Notification",
  trigger: {
    type: "webhook",
    event: "user.signup"
  },
  actions: [
    {
      type: "send_email",
      to: "welcome@example.com",
      subject: "Welcome!"
    }
  ]
});`}</pre>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Python Examples</h2>
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Execute a Workflow</h3>
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-sm">
                <pre>{`result = client.execute_workflow(
    workflow_id="123",
    data={"email": "user@example.com"}
)`}</pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
