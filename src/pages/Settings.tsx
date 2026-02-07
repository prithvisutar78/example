import { Card, CardContent, CardHeader } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-slate-500">
          Configure currencies, integrations, and notification rules.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold">Multi-currency</p>
              <p className="text-xs text-slate-500">Exchange rate API integration</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="text-xs text-slate-500">
              Base Currency
              <Input defaultValue="USD" className="mt-1" />
            </label>
            <label className="text-xs text-slate-500">
              Preferred currencies
              <Input defaultValue="EUR, GBP, CAD" className="mt-1" />
            </label>
            <Button variant="secondary">Sync Rates</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold">Integrations & Webhooks</p>
              <p className="text-xs text-slate-500">Shopify, WooCommerce, ERP</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-800">
              Create webhooks for order sync, stock updates, and supplier portal alerts.
            </div>
            <Button>Configure Webhooks</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
