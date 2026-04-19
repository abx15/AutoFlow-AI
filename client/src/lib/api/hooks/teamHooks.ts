import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import { toast } from "sonner";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member" | "viewer";
  lastLoginAt?: string;
  createdAt: string;
}

export interface Invitation {
  id: string;
  email: string;
  role: string;
  status: "pending" | "accepted" | "expired";
  expiresAt: string;
}

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      const res = await apiClient.get("/auth/team");
      return res.data.data as TeamMember[];
    },
  });
};

export const useTeamInvitations = () => {
  return useQuery({
    queryKey: ["team-invitations"],
    queryFn: async () => {
      const res = await apiClient.get("/auth/team/invitations");
      return res.data.data as Invitation[];
    },
  });
};

export const useInviteMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { email: string; role: string }) => {
      const res = await apiClient.post("/auth/team/invitations", data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-invitations"] });
      toast.success("Invitation sent successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to send invitation");
    }
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/auth/team/members/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Member removed from team");
    },
  });
};
