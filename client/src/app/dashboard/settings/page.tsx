"use client";

import { useState, useEffect } from "react";
import { 
  Building, 
  Globe, 
  Lock, 
  Bell, 
  Shield, 
  Zap, 
  Trash2, 
  Save,
  CheckCircle2,
  AlertTriangle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useOrgSettings, useUpdateOrgSettings } from "@/lib/api/hooks/settingsHooks";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { data: org, isLoading } = useOrgSettings();
  const { mutate: updateOrg, isPending: isUpdating } = useUpdateOrgSettings();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    website: "",
    enforceMfa: false,
    autoApproveInvitations: false,
    notifyOnFailure: true,
  });

  useEffect(() => {
    if (org) {
      setFormData({
        name: org.name || "",
        slug: org.slug || "",
        website: (org as any).settings?.website || "",
        enforceMfa: (org as any).settings?.enforceMfa || false,
        autoApproveInvitations: (org as any).settings?.autoApproveInvitations || false,
        notifyOnFailure: (org as any).settings?.notifyOnFailure ?? true,
      });
    }
  }, [org]);

  const handleSave = () => {
    updateOrg({
      name: formData.name,
      slug: formData.slug,
      settings: {
        website: formData.website,
        enforceMfa: formData.enforceMfa,
        autoApproveInvitations: formData.autoApproveInvitations,
        notifyOnFailure: formData.notifyOnFailure,
      }
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64 bg-muted/50" />
          <Skeleton className="h-4 w-96 bg-muted/50" />
        </div>
        <Skeleton className="h-12 w-full bg-muted/50 rounded-2xl" />
        <Skeleton className="h-[400px] w-full bg-muted/50 rounded-[2.5rem]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-black italic tracking-tight">Organization Profile</h1>
        <p className="text-muted-foreground text-sm font-medium">Control your workspace identity and engine-wide automation parameters.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-8">
        <TabsList className="bg-muted/30 p-1.5 rounded-2xl border border-border/50 w-full md:w-auto h-auto">
          <TabsTrigger value="general" className="rounded-xl px-8 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl px-8 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-xl px-8 py-2.5 font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            Platform
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="glass border-none rounded-[2.5rem] shadow-2xl overflow-hidden">
            <CardHeader className="p-10 pb-0">
              <CardTitle className="text-xl font-black">Entity Details</CardTitle>
              <CardDescription>How your organization is viewed across the public API.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Legal Name</Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-14 bg-muted/30 border-none px-6 rounded-2xl font-bold text-lg" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">URL Identifier (Slug)</Label>
                  <div className="relative">
                    <Input 
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="h-14 bg-muted/30 border-none pl-6 pr-12 rounded-2xl font-mono text-lg font-bold" 
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50">.ai</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Developer Home (Website)</Label>
                <div className="flex bg-muted/30 rounded-2xl overflow-hidden focus-within:ring-2 ring-primary/20 transition-all">
                  <div className="h-14 px-5 bg-muted/50 flex items-center border-r border-border/50 text-muted-foreground">
                    <Globe className="w-5 h-5" />
                  </div>
                  <Input 
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://autoflow.ai"
                    className="h-14 border-none bg-transparent px-6 font-bold" 
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-border/50 flex justify-end">
                <Button 
                  className="h-14 px-10 rounded-2xl font-black bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 gap-3"
                  onClick={handleSave}
                  disabled={isUpdating}
                >
                  {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  SYNC CHANGES
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6">
            <Card className="glass border-none rounded-[2.5rem] shadow-xl overflow-hidden">
               <CardHeader className="p-8">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Lock className="w-5 h-5" />
                     </div>
                     <div>
                        <CardTitle className="text-xl font-black italic">Access Control</CardTitle>
                        <CardDescription>Strengthen your organization's perimeter security.</CardDescription>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="px-8 pb-8 space-y-6">
                  <div className="flex items-center justify-between p-6 rounded-3xl bg-muted/30 group">
                     <div className="space-y-1">
                        <p className="font-bold text-sm">Enforce Multi-Factor Auth (MFA)</p>
                        <p className="text-xs text-muted-foreground">Require all team members to use 2FA to access the engine.</p>
                     </div>
                     <Switch 
                        checked={formData.enforceMfa} 
                        onCheckedChange={(val) => setFormData({ ...formData, enforceMfa: val })} 
                     />
                  </div>
                  <div className="flex items-center justify-between p-6 rounded-3xl bg-muted/30 group">
                     <div className="space-y-1">
                        <p className="font-bold text-sm">Auto-Approve Invitations</p>
                        <p className="text-xs text-muted-foreground">Automatically link domains from verified company emails.</p>
                     </div>
                     <Switch 
                        checked={formData.autoApproveInvitations} 
                        onCheckedChange={(val) => setFormData({ ...formData, autoApproveInvitations: val })} 
                     />
                  </div>
               </CardContent>
            </Card>

            <Card className="glass border-none rounded-[2.5rem] shadow-xl overflow-hidden border-destructive/20 border-b-4">
               <CardHeader className="p-8">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                        <Trash2 className="w-5 h-5" />
                     </div>
                     <div>
                        <CardTitle className="text-xl font-black text-destructive">Danger Zone</CardTitle>
                        <CardDescription>Irreversible actions for your organization.</CardDescription>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="px-8 pb-8 space-y-4">
                  <div className="p-6 border border-destructive/20 bg-destructive/5 rounded-3xl flex items-center justify-between">
                     <div className="space-y-1">
                        <p className="font-bold text-sm text-destructive">Delete Organization</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Wipe all workflows, logs, and billing data.</p>
                     </div>
                     <Button variant="destructive" className="font-black px-6 rounded-xl h-10">TERMINATE</Button>
                  </div>
               </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
           <Card className="glass border-none rounded-[2.5rem] shadow-xl overflow-hidden">
              <CardHeader className="p-10">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                       <Bell className="w-5 h-5" />
                    </div>
                    <div>
                       <CardTitle className="text-xl font-black">Platform Alerts</CardTitle>
                       <CardDescription>Stay informed about your engine's health.</CardDescription>
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="px-10 pb-10 space-y-6">
                 <div className="flex items-center justify-between p-6 rounded-3xl bg-muted/30">
                    <div className="space-y-1">
                       <p className="font-bold text-sm">Execution Failure Alerts</p>
                       <p className="text-xs text-muted-foreground">Instant notifications when a production workflow crashes.</p>
                    </div>
                    <Switch 
                       checked={formData.notifyOnFailure} 
                       onCheckedChange={(val) => setFormData({ ...formData, notifyOnFailure: val })} 
                    />
                 </div>
                 
                 <div className="bg-primary/5 p-8 rounded-[2rem] flex gap-5 items-start">
                    <Zap className="w-8 h-8 text-primary shrink-0" />
                    <div className="space-y-2">
                       <h4 className="font-black text-sm uppercase tracking-tight italic">AUTO-SCALING ENGINE</h4>
                       <p className="text-[10px] leading-relaxed text-muted-foreground font-bold group">
                          Your organization's compute allocation is currently set to <span className="text-primary">DYNAMIC_BURST</span>. To configure dedicated hardware nodes, contact support.
                       </p>
                       <Button variant="link" className="p-0 h-auto text-[10px] font-black uppercase text-primary tracking-widest">
                          View Infrastructure Plan
                       </Button>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
