"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  ChevronRight, 
  ChevronLeft, 
  Settings, 
  Bot,
  MessageSquare,
  Code2,
  CheckCircle2,
  Laptop,
  Mail,
  Clock,
  Globe,
  MousePointer2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateWorkflow } from "@/lib/api/hooks/workflowHooks";

const steps = [
  { id: 1, name: "Trigger", icon: Zap },
  { id: 2, name: "Agent", icon: Bot },
  { id: 3, name: "Tools", icon: Settings },
];

export default function NewWorkflowPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    triggerType: "",
    aiModel: "GPT-4o",
    agentInstruction: "",
    tools: [] as string[]
  });
  const router = useRouter();
  const { mutate: createWorkflow, isPending } = useCreateWorkflow();

  const handleNext = () => {
    if (currentStep === 1 && (!formData.name || !formData.triggerType)) {
      toast.error("Please provide a name and select a trigger");
      return;
    }
    if (currentStep === 2 && !formData.agentInstruction) {
      toast.error("Please provide initial instructions for the agent");
      return;
    }
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCreate = () => {
    const payload = {
      name: formData.name,
      triggerType: formData.triggerType,
      agentInstruction: formData.agentInstruction,
      aiModel: formData.aiModel,
      steps: formData.tools.map(tool => ({
        id: crypto.randomUUID(),
        name: `Tool ${tool}`,
        tool: tool === "email" ? "send_email" : tool === "slack" ? "send_slack_message" : "log_message",
        config: {}
      }))
    };

    createWorkflow(payload, {
      onSuccess: () => {
        router.push("/dashboard/workflows");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-12">
      {/* Step Indicator */}
      <div className="flex items-center justify-between relative px-2">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted/30 -translate-y-1/2 -z-10" />
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
              currentStep === step.id ? "bg-primary text-white shadow-xl shadow-primary/30 scale-110" : 
              currentStep > step.id ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
            )}>
              {currentStep > step.id ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
            </div>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
              currentStep >= step.id ? "text-primary" : "text-muted-foreground"
            )}>{step.name}</span>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-black">Define your workflow</h2>
                <p className="text-muted-foreground">Give it a name and choose how it should be triggered.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Workflow Name</label>
                  <Input 
                    placeholder="e.g. Customer Support AI" 
                    className="h-14 text-lg font-medium bg-muted/30 border-none px-6 rounded-2xl"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Trigger Mechanism</label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <TriggerCard 
                      icon={Globe} 
                      title="Webhook" 
                      desc="Trigger via HTTP POST request" 
                      selected={formData.triggerType === "webhook"}
                      onClick={() => setFormData({ ...formData, triggerType: "webhook" })}
                    />
                    <TriggerCard 
                      icon={Clock} 
                      title="Cron / Scheduled" 
                      desc="Run on a specific interval" 
                      selected={formData.triggerType === "cron"}
                      onClick={() => setFormData({ ...formData, triggerType: "cron" })}
                    />
                    <TriggerCard 
                      icon={MousePointer2} 
                      title="Manual" 
                      desc="Run on demand via UI or API" 
                      selected={formData.triggerType === "manual"}
                      onClick={() => setFormData({ ...formData, triggerType: "manual" })}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-black">Configure your Agent</h2>
                <p className="text-muted-foreground">Select an AI model and provide the execution prompt.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">AI Model</label>
                  <Select 
                    value={formData.aiModel} 
                    onValueChange={(v) => setFormData({ ...formData, aiModel: v })}
                  >
                    <SelectTrigger className="h-14 font-bold bg-muted/30 border-none px-6 rounded-2xl">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent className="glass border-border/50">
                      <SelectItem value="GPT-4o">OpenAI GPT-4o (Standard)</SelectItem>
                      <SelectItem value="Claude 3.5">Anthropic Claude 3.5 Sonnet (Advanced)</SelectItem>
                      <SelectItem value="Gemini 1.5">Google Gemini 1.5 Pro (Long Context)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">System Prompt / Instructions</label>
                    <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary">AI Reasoning Enabled</Badge>
                  </div>
                  <Textarea 
                    placeholder="Provide detailed instructions on what the agent should do when triggered. You can use {{brackets}} for dynamic variables from the input." 
                    className="min-h-[250px] bg-muted/30 border-none p-6 rounded-2xl text-md leading-relaxed resize-none"
                    value={formData.agentInstruction}
                    onChange={(e) => setFormData({ ...formData, agentInstruction: e.target.value })}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-black">Enable Power-ups</h2>
                <p className="text-muted-foreground">Choose which tools the agent can access to perform actions.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <ToolToggle 
                  icon={Mail} 
                  name="Email Delivery" 
                  desc="Send transactional emails via SendGrid" 
                  active={formData.tools.includes("email")}
                  onToggle={() => toggleTool("email")}
                />
                <ToolToggle 
                  icon={MessageSquare} 
                  name="Slack Notifications" 
                  desc="Post messages to channels" 
                  active={formData.tools.includes("slack")}
                  onToggle={() => toggleTool("slack")}
                />
                <ToolToggle 
                  icon={Code2} 
                  name="Code Interpreter" 
                  desc="Execute secure Python/JS snippets" 
                  active={formData.tools.includes("code")}
                  onToggle={() => toggleTool("code")}
                />
                <ToolToggle 
                  icon={Laptop} 
                  name="Web Browsing" 
                  desc="Agent can search and view websites" 
                  active={formData.tools.includes("browse")}
                  onToggle={() => toggleTool("browse")}
                />
              </div>

              <div className="p-8 glass rounded-3xl space-y-4">
                <h3 className="font-bold">Workflow Summary</h3>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest mb-1">Name</div>
                    <div className="font-bold">{formData.name}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest mb-1">Model</div>
                    <div className="font-bold text-primary">{formData.aiModel}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest mb-1">Trigger</div>
                    <div className="font-bold capitalize">{formData.triggerType}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest mb-1">Tools</div>
                    <div className="font-bold">{formData.tools.length} Enabled</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-10 border-t border-border/50">
        <Button 
          variant="outline" 
          onClick={handleBack} 
          disabled={currentStep === 1 || isPending}
          className="gap-2 h-12 px-8 font-bold rounded-xl"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous Step
        </Button>
        {currentStep < 3 ? (
          <Button 
            onClick={handleNext}
            className="gap-2 h-12 px-8 font-bold rounded-xl shadow-lg shadow-primary/20"
          >
            Next Step
            <ChevronRight className="w-5 h-5" />
          </Button>
        ) : (
          <Button 
            onClick={handleCreate}
            disabled={isPending}
            className="gap-2 h-12 px-8 font-bold rounded-xl bg-green-600 hover:bg-green-500 shadow-lg shadow-green-500/20 min-w-[180px]"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                Create Workflow
                <CheckCircle2 className="w-5 h-5" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );

  function toggleTool(tool: string) {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.includes(tool) 
        ? prev.tools.filter(t => t !== tool) 
        : [...prev.tools, tool]
    }));
  }
}

function TriggerCard({ icon: Icon, title, desc, selected, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-6 rounded-2xl border-2 transition-all cursor-pointer group flex flex-col gap-4",
        selected ? "bg-primary/5 border-primary shadow-xl shadow-primary/10" : "bg-muted/20 border-transparent hover:bg-muted/30"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
        selected ? "bg-primary text-white" : "bg-muted text-muted-foreground"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="font-bold text-sm mb-1">{title}</div>
        <div className="text-[10px] text-muted-foreground leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

function ToolToggle({ icon: Icon, name, desc, active, onToggle }: any) {
  return (
    <div 
      onClick={onToggle}
      className={cn(
        "p-5 rounded-2xl border-2 transition-all cursor-pointer flex gap-4",
        active ? "bg-primary/5 border-primary" : "bg-muted/10 border-transparent hover:bg-muted/20"
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded-xl shrink-0 flex items-center justify-center",
        active ? "bg-primary text-white shadow-lg" : "bg-muted text-muted-foreground"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold text-sm">{name}</span>
          {active && <CheckCircle2 className="w-4 h-4 text-primary" />}
        </div>
        <p className="text-[10px] text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
