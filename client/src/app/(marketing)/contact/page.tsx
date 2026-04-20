import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - AutoFlow AI',
  description: 'Get in touch with the AutoFlow AI team. We\'re here to help with any questions, feedback, or support needs.',
};

export default function ContactPage() {
  return (
    <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
              Contact <span className="text-brand-500">AutoFlow AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? Need support? Want to learn more? We&apos;re here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Email Support</h3>
                  <p className="text-muted-foreground mb-2">
                    Send us an email and we&apos;ll get back to you within 24 hours.
                  </p>
                  <a href="mailto:support@autoflow.ai" className="text-brand-500 hover:text-brand-400 transition-colors">
                    support@autoflow.ai
                  </a>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Sales Inquiries</h3>
                  <p className="text-muted-foreground mb-2">
                    Interested in enterprise solutions or custom plans?
                  </p>
                  <a href="mailto:sales@autoflow.ai" className="text-brand-500 hover:text-brand-400 transition-colors">
                    sales@autoflow.ai
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Technical Support</h3>
                  <p className="text-muted-foreground mb-2">
                    Need help with implementation or troubleshooting?
                  </p>
                  <a href="mailto:tech@autoflow.ai" className="text-brand-500 hover:text-brand-400 transition-colors">
                    tech@autoflow.ai
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Office Location</h3>
                  <p className="text-muted-foreground">
                    Made with love in India<br />
                    Available globally 24/7
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    >
                      <option value="">Select a topic</option>
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-500 transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Follow Us</h2>
            <div className="flex justify-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted-foreground hover:text-brand-500 hover:border-brand-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted-foreground hover:text-brand-500 hover:border-brand-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted-foreground hover:text-brand-500 hover:border-brand-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
    </main>
  );
}
