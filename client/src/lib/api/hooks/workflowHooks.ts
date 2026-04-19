import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import { toast } from "sonner";

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: "draft" | "active" | "paused" | "archived";
  triggerType: "webhook" | "cron" | "manual";
  lastRunAt?: string;
  executionsCount: number;
  successRate: number;
  aiModel: string;
}

export const useWorkflows = (params?: any) => {
  return useQuery({
    queryKey: ["workflows", params],
    queryFn: async () => {
      const res = await apiClient.get("/workflows", { params });
      return res.data.data.workflows as Workflow[];
    },
  });
};

export const useWorkflow = (id: string) => {
  return useQuery({
    queryKey: ["workflow", id],
    queryFn: async () => {
      const res = await apiClient.get(`/workflows/${id}`);
      return res.data.data as Workflow;
    },
    enabled: !!id,
  });
};

export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiClient.post("/workflows", data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
      toast.success("Workflow created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create workflow");
    },
  });
};

export const useUpdateWorkflowStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const endpoint = status === "active" ? "activate" : "pause";
      const res = await apiClient.post(`/workflows/${id}/${endpoint}`);
      return res.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
      queryClient.invalidateQueries({ queryKey: ["workflow", variables.id] });
      toast.success(`Workflow ${variables.status === "active" ? "activated" : "paused"}`);
    },
  });
};

export const useRunWorkflow = () => {
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input?: any }) => {
      const res = await apiClient.post(`/workflows/${id}/run`, { input });
      return res.data.data;
    },
    onSuccess: (data) => {
      toast.success("Workflow execution started");
      return data;
    },
  });
};
