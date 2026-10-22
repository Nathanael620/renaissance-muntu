import { useEffect, useState, type ReactNode } from "react";
import { ApiError } from "../services/apiClient";
import { getCurrentAdmin, type AdminUser } from "../services/adminService";
import { navigateToPath } from "../routing/routes";

type Props = {
  permission: string;
  children: (user: AdminUser) => ReactNode;
};

export default function AdminRouteGuard({ permission, children }: Props) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getCurrentAdmin()
      .then((currentUser) => {
        if (active) setUser(currentUser);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        if (requestError instanceof ApiError && requestError.status === 401) {
          navigateToPath("/admin/connexion");
          return;
        }
        setError(requestError instanceof Error ? requestError.message : "Impossible de vérifier la session.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-sm text-[#5d564e]">Vérification de la session…</div>;
  }

  if (error) {
    return <div className="m-6 rounded-xl border border-[#d38a80] bg-[#fdf0ee] p-4 text-sm text-[#7c2d26]" role="alert">{error}</div>;
  }

  if (!user) return null;

  if (!user.permissions.includes(permission)) {
    return <div className="m-6 rounded-xl border border-[#d7cfba] bg-white p-4 text-sm text-[#5d564e]" role="alert">Votre compte ne dispose pas de l’autorisation nécessaire.</div>;
  }

  return children(user);
}
