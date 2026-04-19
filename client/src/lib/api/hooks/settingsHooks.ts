import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";

export interface OrgSettings {
  name: string;
  slug: string;
  settings: Record<string, any>;
  isActive: boolean;
}

export const useOrgSettings = () => {
  return useQuery({
    queryKey: ["org-settings"],
    queryFn: async () => {
      const res = await apiClient.get("/auth/org");
      return res.data.data as OrgSettings;
    },
  });
};

export const useUpdateOrgSettings = () => {
  const queryClient = useQueryClient();
  const { fetchMe } = useAuthStore();
  
  return useMutation({
    mutationFn: async (data: Partial<OrgSettings>) => {
      const res = await apiClient.patch("/auth/org", data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org-settings"] });
      fetchMe(); // Refresh global auth store
      toast.success("Settings updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update settings");
    }
  });
};
