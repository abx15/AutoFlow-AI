import { Metadata } from 'next';
import Link from "next/link";
import { Calendar, User } from "lucide-react";

export const metadata: Metadata = {
  title: 'Blog - AutoFlow AI',
  description: 'Stay updated with the latest news, tips, and insights about AI-powered workflow automation.',
};

const blogPosts = [
  {
    id: 1,
    title: "10 Ways AI is Transforming Workflow Automation",
    excerpt: "Discover how artificial intelligence is revolutionizing the way we automate business processes and boost productivity.",
    author: "Sarah Chen",
    date: "2024-04-15",
    readTime: "5 min read",
    category: "AI & Automation",
    image: "/api/placeholder/800/400"
  },
  {
    id: 2,
    title: "Building Scalable Workflows: Best Practices",
    excerpt: "Learn the essential principles for creating workflows that grow with your business and maintain performance under load.",
    author: "Mike Johnson",
    date: "2024-04-10",
    readTime: "8 min read",
    category: "Best Practices",
    image: "/api/placeholder/800/400"
  },
  {
    id: 3,
    title: "The Future of Low-Code Development",
    excerpt: "Explore how low-code platforms are democratizing software development and enabling faster innovation cycles.",
    author: "Emily Davis",
    date: "2024-04-05",
    readTime: "6 min read",
    category: "Development",
    image: "/api/placeholder/800/400"
  },
  {
    id: 4,
    title: "Security in Automated Workflows: What You Need to Know",
    excerpt: "Understanding the security implications of workflow automation and how to protect your data and processes.",
    author: "Alex Kumar",
    date: "2024-03-28",
    readTime: "7 min read",
    category: "Security",
    image: "/api/placeholder/800/400"
  },
  {
    id: 5,
    title: "Measuring ROI of Workflow Automation",
    excerpt: "Learn how to calculate and demonstrate the return on investment for your workflow automation initiatives.",
    author: "Lisa Wang",
    date: "2024-03-20",
    readTime: "5 min read",
    category: "Business",
    image: "/api/placeholder/800/400"
  },
  {
    id: 6,
    title: "Integrating Third-Party APIs in Your Workflows",
    excerpt: "A comprehensive guide to connecting external services and APIs to create powerful automated workflows.",
    author: "Tom Roberts",
    date: "2024-03-15",
    readTime: "9 min read",
    category: "Technical",
    image: "/api/placeholder/800/400"
  }
];

const categories = ["All", "AI & Automation", "Best Practices", "Development", "Security", "Business", "Technical"];

export default function BlogPage() {
  return (
    <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
              AutoFlow <span className="text-brand-500">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, tips, and best practices for AI-powered workflow automation
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-brand-500 text-white"
                    : "bg-surface border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-surface border border-border rounded-lg overflow-hidden hover:border-brand-500 transition-colors">
                <div className="aspect-video bg-linear-to-br from-brand-500/20 to-purple-600/20 flex items-center justify-center">
                  <div className="text-4xl font-bold text-brand-500">
                    {post.title.charAt(0)}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2 py-1 bg-brand-500/10 text-brand-500 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-brand-500 hover:text-brand-400 font-medium transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 text-center bg-surface border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get the latest insights and best practices delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-500 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
    </main>
  );
}
