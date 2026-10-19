import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  Handshake,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  Mail,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { navigateToPath } from "../routing/routes";

const navItems = [
  { label: "Tableau de bord", path: "/admin", icon: LayoutDashboard },
  { label: "Messages", path: "/admin/messages", icon: Mail },
  { label: "Partenariats", path: "/admin/partenariats", icon: Handshake },
  { label: "Bibliothèque", path: "/admin/bibliotheque", icon: LibraryBig },
  { label: "Administrateurs", path: "/admin/administrateurs", icon: Users },
  { label: "Paramètres", path: "/admin/parametres", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onRouteChange = () => setPathname(window.location.pathname);
    window.addEventListener("routechange", onRouteChange);
    window.addEventListener("popstate", onRouteChange);
    return () => {
      window.removeEventListener("routechange", onRouteChange);
      window.removeEventListener("popstate", onRouteChange);
    };
  }, []);

  const currentTitle = navItems.find((item) => pathname === item.path || pathname.startsWith(`${item.path}/`))?.label ?? "Administration";

  const handleNavigation = (path: string) => {
    navigateToPath(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f1e6] text-[#1f2a1f]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-[#d7cfba] bg-[#0f2d22] text-[#f5f1e6] transition-transform duration-200 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4a84b] text-sm font-semibold text-[#0f2d22]">
              RM
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4a84b]">Muntu</p>
              <p className="text-lg font-semibold">Renaissance</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-full border border-white/10 p-1 text-[#f5f1e6] md:hidden"
            aria-label="Fermer la navigation"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        <nav className="space-y-2 px-4 py-6">
          {navItems.map(({ label, path, icon: Icon }) => {
            const active = pathname === path || pathname.startsWith(`${path}/`);
            return (
              <button
                key={path}
                type="button"
                onClick={() => handleNavigation(path)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                  active ? "bg-[#d4a84b] text-[#0f2d22] shadow-sm" : "text-[#e8e0d1] hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="mt-6 border-t border-white/10 px-4 py-5">
          <button
            type="button"
            onClick={() => handleNavigation("/")}
            className="flex w-full items-center justify-between rounded-xl border border-white/10 px-3 py-2 text-sm text-[#f5f1e6] hover:bg-white/5"
          >
            <span className="flex items-center gap-2">
              <ArrowUpRight size={16} />
              Retour au site public
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNavigation("/admin/connexion")}
            className="mt-3 flex w-full items-center justify-between rounded-xl border border-[#d4a84b]/40 px-3 py-2 text-sm text-[#f5f1e6] hover:bg-[#d4a84b]/10"
          >
            <span className="flex items-center gap-2">
              <LogOut size={16} />
              Déconnexion
            </span>
          </button>
        </div>
      </aside>

      <div className="min-h-screen md:pl-72">
        <header className="sticky top-0 z-20 border-b border-[#d7cfba] bg-[#fdfbf7]/90 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen((state) => !state)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d7cfba] bg-white text-[#0f2d22] md:hidden"
                aria-label="Ouvrir la navigation"
              >
                <Menu size={18} />
              </button>

              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#7a6b3d]">Espace d'administration</p>
                <h1 className="font-serif text-2xl font-semibold text-[#0f2d22]">{currentTitle}</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7cfba] bg-white text-[#0f2d22]"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#b8860b]" />
              </button>

              <div className="flex items-center gap-3 rounded-full border border-[#d7cfba] bg-white px-3 py-2 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f2d22] text-sm font-semibold text-[#f5f1e6]">
                  AM
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-[#0f2d22]">Aissatou M.</p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#726347]">Principal</p>
                </div>
                <ChevronDown size={16} className="text-[#0f2d22]" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>

      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-20 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7cfba] bg-white text-[#0f2d22] shadow-sm md:hidden"
          aria-label="Ouvrir la navigation"
        >
          <PanelLeftOpen size={18} />
        </button>
      )}

      <div className="fixed inset-0 z-30 bg-[#0d2818]/40 md:hidden" hidden={!sidebarOpen} onClick={() => setSidebarOpen(false)} aria-hidden />
    </div>
  );
}

export function AdminSearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-[#d7cfba] bg-white px-3 py-2 text-sm text-[#4d4d4d] shadow-sm">
      <Search size={16} className="text-[#6e5d35]" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Rechercher..."
        className="w-full border-0 bg-transparent text-sm text-[#1f2a1f] outline-none placeholder:text-[#706a61]"
      />
    </label>
  );
}

export function AdminBadge({ status }: { status: string }) {
  const palette: Record<string, string> = {
    Nouveau: "bg-[#f6e7c8] text-[#7a5510]",
    Lu: "bg-[#dfece5] text-[#1f5c4a]",
    "En cours": "bg-[#e6f0ff] text-[#214a8a]",
    Archivé: "bg-[#ece8df] text-[#4a483d]",
    "À revoir": "bg-[#fbe9d0] text-[#8f5725]",
    Accepté: "bg-[#dfece5] text-[#1f5c4a]",
    Refusé: "bg-[#f4d9d8] text-[#8f3f39]",
    Publié: "bg-[#ddf0e6] text-[#1d5d47]",
    Brouillon: "bg-[#f3ead7] text-[#7a5d12]",
    "À valider": "bg-[#e9def8] text-[#5b3e8b]",
    Actif: "bg-[#ddf0e6] text-[#1d5d47]",
    "En attente": "bg-[#f5ebd0] text-[#7a5d12]",
    Désactivé: "bg-[#ece8df] text-[#4a483d]",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${palette[status] ?? "bg-[#f1efe9] text-[#473f31]"}`}>
      {status}
    </span>
  );
}

export function AdminEmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d7cfba] bg-[#fffdf9] p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ee] text-[#1b4332]">
        <ShieldCheck size={20} />
      </div>
      <h3 className="mt-4 font-serif text-xl font-semibold text-[#0f2d22]">{title}</h3>
      <p className="mt-2 text-sm text-[#5d564e]">{description}</p>
    </div>
  );
}
