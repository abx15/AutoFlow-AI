"use client";

import { useState } from "react";
import { 
  Plus, 
  Users, 
  Mail, 
  Shield, 
  MoreHorizontal, 
  UserPlus, 
  Clock, 
  Trash2, 
  ShieldCheck,
  ShieldAlert,
  Loader2,
  ExternalLink
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useTeamMembers, useTeamInvitations, useInviteMember, useRemoveMember } from "@/lib/api/hooks/teamHooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function TeamPage() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  const { data: members, isLoading: loadingMembers } = useTeamMembers();
  const { data: invitations, isLoading: loadingInvites } = useTeamInvitations();
  const { mutate: inviteMember, isPending: isInviting } = useInviteMember();
  const { mutate: removeMember } = useRemoveMember();

  const handleInvite = () => {
    inviteMember({ email: inviteEmail, role: inviteRole }, {
      onSuccess: () => {
        setInviteEmail("");
        setShowInviteDialog(false);
      }
    });
  };

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black">Organization Team</h1>
          <p className="text-muted-foreground text-sm font-medium">Manage permissions and collaborate with your fellow automation engineers.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-11 rounded-xl border-none bg-muted/30 gap-2 px-6">
              <Users className="w-4 h-4" />
              Sync Directory
           </Button>
           <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
             <DialogTrigger asChild>
                <Button className="h-11 rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/9 group px-8">
                  <UserPlus className="w-5 h-5 mr-3" />
                  INVITE MEMBER
                </Button>
             </DialogTrigger>
             <DialogContent className="glass border-border/50 rounded-3xl p-8">
               <DialogHeader>
                 <DialogTitle className="text-2xl font-black">SEND INVITATION</DialogTitle>
                 <DialogDescription>New members will receive an email to join your organization.</DialogDescription>
               </DialogHeader>
               <div className="py-6 space-y-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                   <Input 
                    placeholder="teammate@company.com" 
                    className="h-14 bg-muted/30 border-none px-6 rounded-2xl font-bold"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Assigned Role</label>
                   <Select value={inviteRole} onValueChange={setInviteRole}>
                      <SelectTrigger className="h-14 bg-muted/30 border-none px-6 rounded-2xl font-bold">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="glass border-border/50">
                        <SelectItem value="viewer">Viewer (Read Only)</SelectItem>
                        <SelectItem value="member">Member (Full Access)</SelectItem>
                        <SelectItem value="admin">Admin (Manage Billing & Team)</SelectItem>
                      </SelectContent>
                   </Select>
                 </div>
               </div>
               <DialogFooter>
                 <Button className="w-full h-14 rounded-2xl font-black" onClick={handleInvite} disabled={isInviting}>
                    {isInviting ? <Loader2 className="w-5 h-5 animate-spin" /> : "SEND INVITE TOKEN"}
                 </Button>
               </DialogFooter>
             </DialogContent>
           </Dialog>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Members List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass border-none rounded-[2.5rem] shadow-2xl overflow-hidden">
             <CardHeader className="p-8 border-b border-border/50 bg-muted/20 flex flex-row items-center justify-between">
                <div>
                   <CardTitle className="text-lg font-black">Active Members</CardTitle>
                   <CardDescription className="text-xs uppercase tracking-widest font-bold opacity-40 italic">AUTHORIZED IDENTITIES</CardDescription>
                </div>
                <Badge variant="outline" className="h-7 px-3 bg-primary/10 text-primary border-none font-bold">
                   {members?.length || 0} TOTAL
                </Badge>
             </CardHeader>
             <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                   {loadingMembers ? (
                      [1,2,3].map(i => <MemberSkeleton key={i} />)
                   ) : members?.map((member) => (
                      <div key={member.id} className="p-6 flex items-center justify-between group hover:bg-muted/10 transition-colors">
                        <div className="flex items-center gap-4">
                           <Avatar className="h-12 w-12 rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.id}`} />
                              <AvatarFallback className="rounded-2xl bg-primary text-white font-black">{member.name[0]}</AvatarFallback>
                           </Avatar>
                           <div>
                              <div className="font-bold text-sm tracking-tight">{member.name}</div>
                              <div className="text-xs text-muted-foreground">{member.email}</div>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <RoleBadge role={member.role} />
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-muted/30">
                                    <MoreHorizontal className="w-4 h-4" />
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="glass border-border/50 min-w-[180px]">
                                 <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest opacity-40">Manage Member</DropdownMenuLabel>
                                 <DropdownMenuItem className="gap-2 focus:bg-primary/10">
                                    <ShieldCheck className="w-4 h-4 text-primary" /> Modify Role
                                 </DropdownMenuItem>
                                 <DropdownMenuItem className="gap-2">
                                    <Clock className="w-4 h-4" /> View Audit Logs
                                 </DropdownMenuItem>
                                 <DropdownMenuSeparator className="bg-border/50" />
                                 <DropdownMenuItem className="gap-2 text-destructive focus:bg-destructive/10" onClick={() => removeMember(member.id)}>
                                    <Trash2 className="w-4 h-4" /> Remove from Team
                                 </DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </div>
                      </div>
                   ))}
                </div>
             </CardContent>
          </Card>
        </div>

        {/* Pending Invitations */}
        <div className="space-y-6">
           <Card className="glass border-none rounded-[2.5rem] shadow-2xl overflow-hidden">
              <CardHeader className="p-8">
                 <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">Pending Tokens</CardTitle>
                 <CardDescription className="text-xs font-medium">Invites awaiting confirmation from your team.</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-4">
                 {loadingInvites ? (
                    [1,2].map(i => <Skeleton key={i} className="h-20 rounded-2xl bg-muted/50" />)
                 ) : invitations?.length === 0 ? (
                    <div className="p-8 text-center bg-muted/30 rounded-3xl border border-dashed border-border/50">
                       <Mail className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-30" />
                       <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">No pending invites</p>
                    </div>
                 ) : invitations?.map((inv) => (
                    <div key={inv.id} className="p-5 rounded-2xl bg-muted/20 border border-border/50 space-y-3 relative group overflow-hidden">
                       <div className="absolute right-0 top-0 w-1 h-full bg-primary/20" />
                       <div className="flex items-center justify-between">
                          <div className="font-bold text-[10px] tracking-widest text-primary uppercase">{inv.role}</div>
                          <Badge variant="outline" className="h-5 text-[8px] font-black px-1.5 opacity-50">EXPIRES 24H</Badge>
                       </div>
                       <div className="text-xs font-bold truncate">{inv.email}</div>
                       <div className="pt-2 flex gap-2">
                          <Button variant="ghost" className="h-7 text-[9px] font-black uppercase tracking-tighter bg-muted/50 rounded-lg hover:bg-primary hover:text-white flex-1 transition-colors">Resend</Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-destructive hover:bg-destructive/10"><Trash2 className="w-3 h-3" /></Button>
                       </div>
                    </div>
                 ))}
              </CardContent>
           </Card>

           <div className="p-8 glass rounded-[2.5rem] border border-border/50 bg-primary/5 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                 <ShieldAlert className="w-6 h-6" />
              </div>
              <h4 className="font-black text-sm uppercase tracking-tight italic">SECURITY PROTOCOL</h4>
              <p className="text-[10px] leading-relaxed text-muted-foreground font-bold">
                 All team members are required to have MFA enabled. System admins can enforce this globally in <span className="text-primary underline cursor-pointer">Security Settings</span>.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const configs: any = {
    owner: { text: "OWNER", class: "bg-primary text-white shadow-lg shadow-primary/20", icon: ShieldCheck },
    admin: { text: "ADMIN", class: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: Shield },
    member: { text: "MEMBER", class: "bg-green-500/10 text-green-500 border-green-500/20", icon: ShieldCheck },
    viewer: { text: "VIEWER", class: "bg-muted/50 text-muted-foreground border-transparent", icon: Clock },
  };

  const config = configs[role] || configs.viewer;
  const Icon = config.icon;

  return (
    <Badge className={cn("rounded-md gap-1.5 px-2 py-0.5 border text-[9px] font-black tracking-widest", config.class)}>
       <Icon className="w-3 h-3" />
       {config.text}
    </Badge>
  );
}

function MemberSkeleton() {
  return (
    <div className="p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-2xl bg-muted/50" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 bg-muted/50" />
          <Skeleton className="h-3 w-48 bg-muted/50" />
        </div>
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-6 w-20 bg-muted/50" />
        <Skeleton className="h-9 w-9 rounded-xl bg-muted/50" />
      </div>
    </div>
  );
}
