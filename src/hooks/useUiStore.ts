import { create } from "zustand";

interface UiState {
  isSidebarOpen: boolean;
  theme: "light" | "dark";
  toggleSidebar: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

const prefersDark =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const storedTheme =
  typeof window !== "undefined" ? localStorage.getItem("ims-theme") : null;

export const useUiStore = create<UiState>((set) => ({
  isSidebarOpen: true,
  theme: (storedTheme === "dark" || storedTheme === "light")
    ? storedTheme
    : prefersDark
      ? "dark"
      : "light",
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ims-theme", theme);
    }
    set({ theme });
  }
}));
