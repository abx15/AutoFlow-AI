"use client";

import { useState } from "react";
import { 
  Plus, 
  Copy, 
  Trash2, 
  Shield, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Loader2,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useUserApiKeys, useCreateUserApiKey, useDeleteUserApiKey } from "@/lib/api/hooks/keyHooks";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function MyApiKeysPage() {
  const { data: keys, isLoading } = useUserApiKeys();
  const { mutate: createKey, isPending: isCreating } = useCreateUserApiKey();
  const { mutate: deleteKey } = useDeleteUserApiKey();
  
  const [newKeyName, setNewKeyName] = useState("");
  const [showKeyDialog, setShowKeyDialog] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  const handleCreate = () => {
    if (!newKeyName) return toast.error("Please provide a name for your personal key");
    createKey({ name: newKeyName }, {
      onSuccess: (data) => {
        setGeneratedKey(data.key || null);
        setNewKeyName("");
        setShowKeyDialog(true);
      }
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            My Personal API Keys
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Generate and manage your personal API keys for accessing AutoFlow Engine. These keys are specific to your account.
          </p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="h-11 rounded-xl border-none bg-muted/30 gap-2 px-6">
             <ExternalLink className="w-4 h-4" />
             Documentation
           </Button>
           <Dialog>
             <DialogTrigger>
                <Button className="h-11 rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/9 group px-8">
                  <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                  CREATE MY KEY
                </Button>
             </DialogTrigger>
             <DialogContent className="glass border-border/50 rounded-3xl p-8">
               <DialogHeader>
                 <DialogTitle className="text-2xl font-black italic">CREATE PERSONAL KEY</DialogTitle>
                 <DialogDescription>
                   Give your personal API key a descriptive name to track its usage. This key will be linked to your account only.
                 </DialogDescription>
               </DialogHeader>
               <div className="py-6 space-y-4">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Key Name</label>
                   <Input 
                    placeholder="e.g. My Development Key" 
                    className="h-14 bg-muted/30 border-none px-6 rounded-2xl text-lg font-bold"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                   />
                 </div>
               </div>
               <DialogFooter>
                 <Button className="w-full h-14 rounded-2xl font-black" onClick={handleCreate} disabled={isCreating}>
                    {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : "CREATE PERSONAL KEY"}
                 </Button>
               </DialogFooter>
             </DialogContent>
           </Dialog>
        </div>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          [1,2,3].map(i => <Skeleton key={i} className="h-32 rounded-3xl bg-muted/50" />)
        ) : keys?.length === 0 ? (
          <div className="p-16 glass rounded-[2.5rem] text-center space-y-6">
            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">No personal API keys found</h3>
              <p className="text-muted-foreground text-sm">You haven&apos;t created any personal API keys yet. Create your first key to get started!</p>
            </div>
          </div>
        ) : (
          keys?.map((key) => (
            <Card key={key.id} className="glass border-none rounded-[2rem] overflow-hidden group hover:bg-muted/10 transition-colors">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                      <User className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                         <h3 className="text-lg font-black">{key.name}</h3>
                         <Badge variant="secondary" className="text-[9px] uppercase font-black px-2 py-0 bg-blue-500/10 text-blue-500">
                           PERSONAL
                         </Badge>
                         <Badge variant={key.isActive ? "default" : "secondary"} className="text-[9px] uppercase font-black px-2 py-0">
                           {key.isActive ? "ACTIVE" : "DISABLED"}
                         </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                         <span className="bg-muted/50 px-2 py-0.5 rounded uppercase tracking-tighter opacity-60">uk_{key.keyPrefix}••••••••</span>
                         <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Created {new Date(key.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" className="h-10 rounded-xl bg-muted/30 px-6 font-bold text-xs gap-2" onClick={() => copyToClipboard(`uk_${key.keyPrefix}...`)}>
                      <Copy className="w-4 h-4" />
                      Copy ID
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="h-10 w-10 p-0 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white"
                      onClick={() => deleteKey(key.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={showKeyDialog} onOpenChange={setShowKeyDialog}>
        <DialogContent className="glass border-border/50 p-10 rounded-[3rem] max-w-xl">
          <DialogHeader className="items-center text-center">
            <div className="w-16 h-16 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mb-6">
               <Shield className="w-8 h-8" />
            </div>
            <DialogTitle className="text-3xl font-black">SAVE YOUR PERSONAL KEY</DialogTitle>
            <DialogDescription className="text-md font-medium px-4">
              This is the only time you&apos;ll be able to see your personal API key. Store it securely in your environment variables.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8">
             <div className="relative group">
                <pre className="bg-black/40 p-8 rounded-3xl text-sm font-mono text-blue-400 break-all border border-white/5 overflow-x-auto">
                  {generatedKey}
                </pre>
                <Button 
                  className="absolute right-4 top-4 h-10 w-10 p-0 rounded-xl bg-white/10 hover:bg-white/20 border-none"
                  onClick={() => copyToClipboard(generatedKey || "")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
             </div>
          </div>
          <div className="bg-amber-500/10 p-6 rounded-2xl flex gap-4 items-start border border-amber-500/20">
             <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
             <p className="text-xs text-amber-500 leading-relaxed font-bold">
               This is your personal API key. Anyone with this key can access your account. Never expose it in client-side code or public repositories.
             </p>
          </div>
          <Button className="w-full h-14 mt-6 rounded-2xl font-black bg-foreground text-background" onClick={() => setShowKeyDialog(false)}>
            I HAVE SECURELY SAVED IT
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
