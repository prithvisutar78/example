import { useEffect, useState } from "react";
import { products as fallbackProducts, Product } from "@/data/mockData";
import { Card, CardContent, CardHeader } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { InventoryTable } from "@/components/organisms/InventoryTable";
import { Grid2X2, List, ScanLine, UploadCloud } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductResponse {
  products: Product[];
}

export function Inventory() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/products");
      const payload = (await response.json()) as ProductResponse;
      setProducts(payload.products);
    };
    load();
  }, []);

  const items = products.length ? products : fallbackProducts;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Inventory Management</h1>
          <p className="text-sm text-slate-500">
            Track stock in real-time across warehouses with batch and expiry alerts.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button>New Product</Button>
          <Button variant="secondary">Create Batch</Button>
          <Button variant="secondary">Generate Labels</Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Stock Controls</p>
                <p className="text-xs text-slate-500">Multi-location & lot tracking</p>
              </div>
              <Badge variant="success">Healthy</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-500">
            <p>3 active warehouses · 24 batch lots tracked</p>
            <p>Expiry alerts enabled (30/60/90 days)</p>
            <p>Auto reorder points configured per SKU</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Barcode / QR Scanner</p>
                <p className="text-xs text-slate-500">Simulate camera input</p>
              </div>
              <ScanLine className="h-5 w-5 text-brand-teal" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-500">
            <input
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              placeholder="Scan or type barcode/QR code"
            />
            <Button variant="secondary" className="w-full">
              Simulate Scan
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Import Data</p>
                <p className="text-xs text-slate-500">CSV / Excel validation preview</p>
              </div>
              <UploadCloud className="h-5 w-5 text-brand-teal" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-500">
            <p>Map columns, validate duplicates, and review errors before upload.</p>
            <Button variant="secondary" className="w-full">
              Upload File
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={view === "list" ? "primary" : "secondary"}
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" /> List view
          </Button>
          <Button
            variant={view === "grid" ? "primary" : "secondary"}
            onClick={() => setView("grid")}
          >
            <Grid2X2 className="h-4 w-4" /> Grid view
          </Button>
        </div>
        <div className="text-xs text-slate-500">
          Showing {items.length} products · Filters: category, supplier, status, date
        </div>
      </div>

      {view === "list" ? (
        <InventoryTable data={items} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 12).map((item) => (
            <Card key={item.id}>
              <CardContent className="space-y-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 w-full rounded-xl object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">{item.sku}</p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant={item.status === "healthy" ? "success" : item.status === "low" ? "warning" : "danger"}>
                    {item.status}
                  </Badge>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {item.location} · Exp {new Date(item.expiry).toLocaleDateString()}
                </div>
                <Link
                  to={`/inventory/${item.id}`}
                  className="text-xs font-semibold text-brand-teal hover:text-brand-navy"
                >
                  View details →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
