import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiClient } from "../api/client";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  orgId: string;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: string;
  tokenQuota: number;
  tokenUsed: number;
}

interface AuthState {
  user: User | null;
  org: Organization | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setAuth: (user: User, org: Organization, token: string, refreshToken: string) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      org: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false, 

      setAuth: (user, org, token, refreshToken) => {
        set({ 
          user, 
          org, 
          token, 
          refreshToken, 
          isAuthenticated: true,
          isLoading: false
        });
      },

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await apiClient.post("/auth/login", { email, password });
          const { user, organization, accessToken, refreshToken } = res.data.data;
          
          set({
            user,
            org: organization,
            token: accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          const res = await apiClient.post("/auth/register", data);
          const { user, organization, tokens } = res.data.data;
          
          set({
            user,
            org: organization,
            token: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await apiClient.post("/auth/logout");
        } catch (e) {
          // ignore
        }
        set({
          user: null,
          org: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false
        });
      },

      restoreSession: async () => {
        const token = get().token;
        if (!token) {
           set({ isAuthenticated: false, isLoading: false });
           return;
        }
        
        set({ isLoading: true });
        try {
          const res = await apiClient.get("/auth/me");
          if (res.data?.data) {
            const payload = res.data.data;
            const user = payload.user || payload;
            const org = payload.org || payload.organization || null;
            set({ 
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                orgId: user.orgId || org?.id
              }, 
              org,
              isAuthenticated: true,
              isLoading: false 
            });
          } else {
            set({ isAuthenticated: false, isLoading: false });
          }
        } catch (error) {
          set({ 
            user: null, 
            org: null, 
            token: null, 
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false 
          });
        }
      },
    }),
    {
      name: "autoflow-auth-storage",
      partialize: (state) => ({ 
        user: state.user, 
        org: state.org, 
        token: state.token, 
        refreshToken: state.refreshToken, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
