import {
  Bell,
  Command,
  Menu,
  Moon,
  Search,
  SunMedium
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { useUiStore } from "@/hooks/useUiStore";

interface TopBarProps {
  onOpenSearch: () => void;
}

export function TopBar({ onOpenSearch }: TopBarProps) {
  const { toggleSidebar, theme, setTheme } = useUiStore();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Inventory Command Center
          </p>
          <p className="text-xs text-slate-500">Realtime visibility across 3 warehouses</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex w-full max-w-xs items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 shadow-subtle transition hover:border-brand-teal dark:border-slate-800 dark:bg-slate-900"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Global search...</span>
          <span className="flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-slate-500 shadow dark:bg-slate-800">
            <Command className="h-3 w-3" />K
          </span>
        </button>
        <Button variant="ghost" aria-label="Notification center">
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          aria-label="Toggle dark mode"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <SunMedium className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:text-slate-200">
          <span className="h-6 w-6 rounded-full bg-brand-teal/20 text-center text-[10px] font-bold text-brand-teal">
            AC
          </span>
          Ava Carter
        </div>
      </div>
    </header>
  );
}
