import { useState, type ReactNode } from "react";
import { AdminUserContext } from "../contexts/adminUserContext";
import type { AdminUser } from "../services/adminService";

export default function AdminUserProvider({ user, children }: { user: AdminUser; children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState(user);
  const updateUser = (updates: Partial<AdminUser>) => setCurrentUser((current) => ({ ...current, ...updates }));

  return <AdminUserContext.Provider value={{ user: currentUser, updateUser }}>{children}</AdminUserContext.Provider>;
}
