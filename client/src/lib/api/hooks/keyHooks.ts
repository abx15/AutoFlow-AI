import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import { toast } from "sonner";

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  keyType?: string;
  permissions: string[];
  lastUsedAt?: string;
  expiresAt?: string;
  isActive: boolean;
  createdAt: string;
  secret?: string; // Only returned on creation
  key?: string; // Full key returned on creation
}

export const useApiKeys = () => {
  return useQuery({
    queryKey: ["api-keys"],
    queryFn: async () => {
      const res = await apiClient.get("/auth/keys");
      return res.data.data as ApiKey[];
    },
  });
};

export const useCreateApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; permissions?: string[] }) => {
      const res = await apiClient.post("/auth/keys", data);
      return res.data.data as ApiKey;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      toast.success("API key generated successfully");
    },
  });
};

export const useDeleteApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/auth/keys/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      toast.success("API key revoked");
    },
  });
};

// User-specific API key hooks
export const useUserApiKeys = () => {
  return useQuery({
    queryKey: ["user-api-keys"],
    queryFn: async () => {
      const res = await apiClient.get("/api-keys/user");
      return res.data.data.apiKeys as ApiKey[];
    },
  });
};

export const useCreateUserApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; permissions?: string[] }) => {
      const res = await apiClient.post("/api-keys/user", data);
      return res.data.data as ApiKey;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-api-keys"] });
      toast.success("Your personal API key generated successfully");
    },
  });
};

export const useDeleteUserApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/api-keys/user/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-api-keys"] });
      toast.success("Your personal API key revoked");
    },
  });
};
