import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";

export interface Execution {
  id: string;
  workflowId: string;
  status: "pending" | "running" | "success" | "failed";
  startedAt: string;
  completedAt?: string;
  durationMs?: number;
  tokensUsed?: number;
  error?: string;
  workflowName?: string;
}

export const useExecutions = (params?: any) => {
  return useQuery({
    queryKey: ["executions", params],
    queryFn: async () => {
      const res = await apiClient.get("/executions", { params });
      return res.data.data;
    },
  });
};

export const useExecutionDetail = (id: string) => {
  return useQuery({
    queryKey: ["execution", id],
    queryFn: async () => {
      const res = await apiClient.get(`/executions/${id}`);
      return res.data.data;
    },
    enabled: !!id,
    refetchInterval: (data) => {
      // Poll if running and not using SSE
      return data?.status === "running" ? 3000 : false;
    }
  });
};

export const useExecutionStats = () => {
  return useQuery({
    queryKey: ["execution-stats"],
    queryFn: async () => {
      const res = await apiClient.get("/executions/stats");
      return res.data.data;
    },
  });
};
