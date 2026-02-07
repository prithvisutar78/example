import { useEffect, useMemo, useState } from "react";
import { products } from "@/data/mockData";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query) return [];
    const term = query.toLowerCase();
    return products
      .filter((item) =>
        [item.name, item.sku, item.category, item.supplier]
          .join(" ")
          .toLowerCase()
          .includes(term)
      )
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handler);
    }
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-6">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-card dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Global Search</h2>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
        <p className="mt-2 text-sm text-slate-500">
          Search across products, suppliers, orders, and documents.
        </p>
        <div className="mt-4">
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type a SKU, product name, or supplier..."
          />
        </div>
        <div className="mt-4 space-y-3">
          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-800">
              Start typing to see results.
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 p-3 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-200"
              >
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-slate-500">
                  {item.sku} · {item.category} · {item.supplier}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
