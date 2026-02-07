import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { purchaseOrders as fallbackOrders } from "@/data/mockData";

interface OrderResponse {
  purchaseOrders: typeof fallbackOrders;
}

export function Orders() {
  const [orders, setOrders] = useState<typeof fallbackOrders>([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/orders");
      const payload = (await response.json()) as OrderResponse;
      setOrders(payload.purchaseOrders);
    };
    load();
  }, []);

  const items = orders.length ? orders : fallbackOrders;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Order Management</h1>
          <p className="text-sm text-slate-500">
            Manage purchase orders and sync inbound inventory.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>Create PO</Button>
          <Button variant="secondary">Import Sales Orders</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div>
            <p className="text-sm font-semibold">Purchase Orders</p>
            <p className="text-xs text-slate-500">Draft → Sent → Partial → Received → Closed</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-4 text-sm dark:border-slate-800"
              >
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">
                    {order.id}
                  </p>
                  <p className="text-xs text-slate-500">{order.supplier}</p>
                </div>
                <div className="text-xs text-slate-500">
                  ETA {new Date(order.eta).toLocaleDateString()}
                </div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  ${order.total.toLocaleString()}
                </div>
                <Badge
                  variant={
                    order.status === "Received" || order.status === "Closed"
                      ? "success"
                      : order.status === "Partial"
                        ? "warning"
                        : "info"
                  }
                >
                  {order.status}
                </Badge>
                <Button variant="secondary">View</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <p className="text-sm font-semibold">Sales Orders (Integration)</p>
            <p className="text-xs text-slate-500">
              Sync orders from Shopify, WooCommerce, and ERP systems.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-800">
            Connect an e-commerce platform to stream sales orders in real time.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
