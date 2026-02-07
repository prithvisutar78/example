import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Card, CardContent, CardHeader } from "@/components/atoms/Card";
import { Input } from "@/components/atoms/Input";
import { Product, Supplier, stockHistory as fallbackHistory } from "@/data/mockData";

interface ProductResponse {
  product: Product;
  stockHistory: typeof fallbackHistory;
  suppliers: Supplier[];
}

export function ProductDetails() {
  const { id } = useParams();
  const [data, setData] = useState<ProductResponse | null>(null);
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const response = await fetch(`/api/products/${id}`);
      const payload = (await response.json()) as ProductResponse;
      setData(payload);
    };
    load();
  }, [id]);

  if (!data?.product) {
    return (
      <Card>
        <CardContent className="p-10 text-center text-sm text-slate-500">
          Loading product profile...
        </CardContent>
      </Card>
    );
  }

  const supplier = data.suppliers.find(
    (item) => item.name === data.product.supplier
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{data.product.name}</h1>
          <p className="text-sm text-slate-500">SKU {data.product.sku}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Edit Product</Button>
          <Button onClick={() => setIsAdjustOpen(true)}>Adjust Stock</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Product Profile</p>
                <p className="text-xs text-slate-500">Editable master data</p>
              </div>
              <Badge variant={data.product.status === "healthy" ? "success" : data.product.status === "low" ? "warning" : "danger"}>
                {data.product.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs text-slate-500">
              Name
              <Input defaultValue={data.product.name} className="mt-1" />
            </label>
            <label className="text-xs text-slate-500">
              SKU
              <Input defaultValue={data.product.sku} className="mt-1" />
            </label>
            <label className="text-xs text-slate-500">
              Category
              <Input defaultValue={data.product.category} className="mt-1" />
            </label>
            <label className="text-xs text-slate-500">
              Supplier
              <Input defaultValue={data.product.supplier} className="mt-1" />
            </label>
            <label className="text-xs text-slate-500">
              Cost Price
              <Input defaultValue={`$${data.product.cost.toFixed(2)}`} className="mt-1" />
            </label>
            <label className="text-xs text-slate-500">
              Selling Price
              <Input defaultValue={`$${data.product.price.toFixed(2)}`} className="mt-1" />
            </label>
            <label className="text-xs text-slate-500 sm:col-span-2">
              Description
              <Input
                defaultValue="High demand item with omni-channel availability"
                className="mt-1"
              />
            </label>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold">Supplier</p>
              <p className="text-xs text-slate-500">Primary contact details</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-500">
            <p className="text-base font-semibold text-slate-800 dark:text-white">
              {supplier?.name}
            </p>
            <p>Contact: {supplier?.contact}</p>
            <p>Email: {supplier?.email}</p>
            <p>Phone: {supplier?.phone}</p>
            <p>Rating: {supplier?.rating} / 5</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold">Stock History</p>
              <p className="text-xs text-slate-500">Auditable movement trail</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.stockHistory.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-brand-teal" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 dark:text-slate-200">
                      {item.action} · {item.note}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-200">
                    {item.qty > 0 ? "+" : ""}
                    {item.qty}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold">Documents</p>
              <p className="text-xs text-slate-500">Invoices, specs, certificates</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-dashed border-slate-200 p-4 text-center text-xs text-slate-500 dark:border-slate-800">
              Drop files or upload documents
            </div>
            <Button variant="secondary" className="w-full">
              Upload Document
            </Button>
          </CardContent>
        </Card>
      </div>

      {isAdjustOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-6">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-card dark:bg-slate-900">
            <h2 className="text-lg font-semibold">Adjust Stock</h2>
            <p className="text-sm text-slate-500">
              Log quantity changes with reason codes for audit compliance.
            </p>
            <div className="mt-4 space-y-3">
              <label className="text-xs text-slate-500">
                Quantity Adjustment
                <Input className="mt-1" placeholder="+20" />
              </label>
              <label className="text-xs text-slate-500">
                Reason
                <Input className="mt-1" placeholder="Cycle count correction" />
              </label>
              <label className="text-xs text-slate-500">
                Notes
                <Input className="mt-1" placeholder="Optional" />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setIsAdjustOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAdjustOpen(false)}>Save Adjustment</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
