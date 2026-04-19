import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { Features } from "@/components/marketing/Features";
import { Stats } from "@/components/marketing/Stats";
import { Pricing } from "@/components/marketing/Pricing";
import { Footer } from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <div className="py-20 bg-background flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to automate your future?</h2>
        <p className="text-muted-foreground mb-8">Join thousands of developers building the next generation of AI-first companies.</p>
        <div className="flex gap-4">
          <a href="/register">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20">
              Get Started Now
            </button>
          </a>
        </div>
      </div>
      <Pricing />
      <Footer />
    </main>
  );
}
