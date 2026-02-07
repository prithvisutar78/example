import {
  BarChart3,
  Boxes,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  Settings,
  UserCog
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/hooks/useUiStore";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/inventory", label: "Inventory", icon: Boxes },
  { to: "/orders", label: "Orders", icon: ClipboardList },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/documents", label: "Documents", icon: FolderKanban },
  { to: "/users", label: "User Management", icon: UserCog },
  { to: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const { isSidebarOpen } = useUiStore();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-slate-200 bg-white px-4 py-6 transition-all dark:border-slate-800 dark:bg-slate-950",
        isSidebarOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-navy text-white">
            <span className="text-lg font-bold">I</span>
          </div>
          {isSidebarOpen && (
            <div>
              <p className="text-sm font-semibold">Inventra</p>
              <p className="text-xs text-slate-500">Smart Inventory. Smarter Business.</p>
            </div>
          )}
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900",
                  isActive &&
                    "bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white"
                )
              }
            >
              <Icon className="h-5 w-5" />
              {isSidebarOpen && <span>{link.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-200 p-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        {isSidebarOpen ? (
          <>
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Need assistance?
            </p>
            <p className="mt-1">Launch the support portal or schedule onboarding.</p>
          </>
        ) : (
          <p className="text-center">Support</p>
        )}
      </div>
    </aside>
  );
}
