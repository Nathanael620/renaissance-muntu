import { createContext, useContext } from "react";
import type { AdminUser } from "../services/adminService";

type AdminUserContextValue = {
  user: AdminUser;
  updateUser: (updates: Partial<AdminUser>) => void;
};

export const AdminUserContext = createContext<AdminUserContextValue | null>(null);

export function useAdminUser(): AdminUser {
  return useAdminUserContext().user;
}

export function useUpdateAdminUser(): (updates: Partial<AdminUser>) => void {
  return useAdminUserContext().updateUser;
}

function useAdminUserContext(): AdminUserContextValue {
  const context = useContext(AdminUserContext);
  if (!context) throw new Error("AdminUserProvider is required for administration pages.");
  return context;
}
