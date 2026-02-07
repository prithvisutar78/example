import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { SearchModal } from "@/components/organisms/SearchModal";
import { useUiStore } from "@/hooks/useUiStore";
import { Dashboard } from "@/pages/Dashboard";
import { Inventory } from "@/pages/Inventory";
import { ProductDetails } from "@/pages/ProductDetails";
import { Orders } from "@/pages/Orders";
import { Reports } from "@/pages/Reports";
import { Documents } from "@/pages/Documents";
import { Users } from "@/pages/Users";
import { Settings } from "@/pages/Settings";

export default function App() {
  const { theme } = useUiStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isCmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isCmdK) {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex h-full min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopBar onOpenSearch={() => setIsSearchOpen(true)} />
        <main className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/:id" element={<ProductDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
