"use client";

import { useState } from "react";
import { 
  LayoutTemplate, 
  Search, 
  Filter, 
  Plus, 
  ExternalLink, 
  Zap, 
  Mail, 
  MessageSquare, 
  BarChart3, 
  ShieldCheck,
  Globe,
  Bot,
  Layers,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const categories = ["All", "Marketing", "Sales", "Operations", "DevOps", "AI Agents"];

const templates = [
  { id: 1, name: "Customer Onboarding", category: "Operations", desc: "Automate welcoming new signups, creating workspace, and syncing to Hubspot.", icon: Layers, models: ["GPT-4o", "Claude 3.5"], popularity: 98 },
  { id: 2, name: "Intelligent Lead Scraper", category: "Sales", desc: "Autonomous agent that finds leads on LinkedIn and generates personalized intros.", icon: Globe, models: ["GPT-4o"], popularity: 92 },
  { id: 3, name: "Slack Knowledge Base", category: "Operations", desc: "Extract tribal knowledge from Slack threads and save to Notion docs.", icon: MessageSquare, models: ["Gemini 1.5"], popularity: 88 },
  { id: 4, name: "Automated Code Auditor", category: "DevOps", desc: "Perform deep architectural reviews on PRs and suggest structural fixes.", icon: Bot, models: ["Claude 3.5"], popularity: 85 },
  { id: 5, name: "Semantic Content Lab", category: "Marketing", desc: "Research competitors and generate multi-layered SEO strategies.", icon: Sparkles, models: ["GPT-4o", "Gemini 1.5"], popularity: 82 },
  { id: 6, name: "Smart Ticket Triage", category: "Operations", desc: "Sentiment analysis on Zendesk tickets with automated resolution drafts.", icon: Mail, models: ["Claude 3.5"], popularity: 79 },
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = templates.filter(t => 
    (activeCategory === "All" || t.category === activeCategory) &&
    (t.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black italic tracking-tight">Workflow Blueprints</h1>
          <p className="text-muted-foreground text-sm font-medium">Standardize your automation stack with pre-validated engineering patterns.</p>
        </div>
        <Button variant="outline" className="gap-2 h-11 rounded-xl border-none bg-muted/30 px-6 font-black uppercase text-[10px] tracking-widest hover:bg-muted/50 transition-all">
          <Plus className="w-4 h-4" />
          Blueprint Request
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search blueprints by name or agent type..." 
            className="pl-12 h-14 bg-muted/20 border-border/50 rounded-2xl font-bold focus:ring-2 ring-primary/20 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex bg-muted/20 p-1.5 rounded-2xl border border-border/50 overflow-x-auto no-scrollbar max-w-full">
          {categories.map((cat) => (
            <Button 
              key={cat}
              size="sm" 
              variant="ghost" 
              className={cn(
                "px-5 h-10 text-[10px] font-black uppercase tracking-widest whitespace-nowrap rounded-xl transition-all",
                activeCategory === cat ? "bg-primary text-white shadow-xl" : "text-muted-foreground hover:bg-white/5"
              )}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((template) => (
          <Card key={template.id} className="glass border-none shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden flex flex-col h-full rounded-[2.5rem] border-b-4 border-transparent hover:border-primary/20">
            <CardContent className="p-10 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-muted/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                  <template.icon className="w-7 h-7" />
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em] mb-1">Impact</div>
                   <div className="text-xs font-black text-primary italic">{template.popularity}%</div>
                </div>
              </div>
              
              <div className="space-y-3 mb-8 flex-1">
                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest bg-primary/5 text-primary border-none h-6 px-3">
                   {template.category}
                </Badge>
                <h3 className="text-xl font-black tracking-tight leading-tight">{template.name}</h3>
                <p className="text-xs font-medium text-muted-foreground leading-relaxed opacity-70 italic">{template.desc}</p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {template.models.map(m => (
                    <Badge key={m} className={cn(
                      "text-[8px] font-black uppercase px-2 h-5 rounded-lg border-none shadow-sm",
                      m === "GPT-4o" ? "bg-green-500 text-white" :
                      m === "Claude 3.5" ? "bg-blue-500 text-white" : "bg-purple-500 text-white"
                    )}>
                      {m}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full h-14 font-black italic rounded-2xl shadow-xl shadow-primary/10 group bg-foreground text-background hover:bg-primary hover:text-white transition-all">
                  DEPLOY ARCHITECTURE
                  <Zap className="ml-2 w-4 h-4 group-hover:fill-current group-hover:animate-pulse" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-12 glass rounded-[3rem] text-center space-y-6 border border-dashed border-border/50 bg-primary/5">
         <div className="w-16 h-16 bg-white flex items-center justify-center rounded-3xl mx-auto shadow-2xl">
            <Bot className="w-8 h-8 text-primary" />
         </div>
         <div className="space-y-2">
            <h3 className="text-2xl font-black italic">Need a custom AI Agent?</h3>
            <p className="text-muted-foreground text-sm font-medium max-w-lg mx-auto leading-relaxed">
               Work with our engineering team to design custom LLM architectures tailored to your specific infrastructure.
            </p>
         </div>
         <Button variant="outline" className="h-12 px-10 rounded-2xl font-black border-none bg-primary text-white hover:bg-primary/9 group">
            CONSULT ARCHITECT
            <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
         </Button>
      </div>
    </div>
  );
}
