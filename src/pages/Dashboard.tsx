import { useEffect, useState } from "react";
import {
  Activity,
  categorySeries,
  kpis as defaultKpis,
  notifications as defaultNotifications,
  stockSeries,
  turnoverSeries
} from "@/data/mockData";
import { Card, CardContent, CardHeader } from "@/components/atoms/Card";
import { KpiCard } from "@/components/molecules/KpiCard";
import { ActivityFeed } from "@/components/organisms/ActivityFeed";
import { NotificationCenter } from "@/components/organisms/NotificationCenter";
import { QuickActions } from "@/components/organisms/QuickActions";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  Box,
  ClipboardCheck,
  TrendingUp,
  TriangleAlert
} from "lucide-react";
import { Skeleton } from "@/components/atoms/Skeleton";

interface DashboardResponse {
  kpis: typeof defaultKpis;
  stockSeries: typeof stockSeries;
  categorySeries: typeof categorySeries;
  turnoverSeries: typeof turnoverSeries;
  activities: Activity[];
  notifications: typeof defaultNotifications;
}

export function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/dashboard");
      const payload = (await response.json()) as DashboardResponse;
      setData(payload);
    };
    load();
  }, []);

  const kpis = data?.kpis ?? defaultKpis;
  const activities = data?.activities ?? [];
  const notifications = data?.notifications ?? defaultNotifications;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-500">
            Snapshot of inventory health, alerts, and velocity.
          </p>
        </div>
        <QuickActions />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Stock Value"
          value={`$${kpis.totalStockValue.toLocaleString()}`}
          change="+12.4% vs last month"
          icon={<Box className="h-5 w-5" />}
        />
        <KpiCard
          label="Low Stock Alerts"
          value={kpis.lowStockAlerts}
          change="7 critical items"
          icon={<TriangleAlert className="h-5 w-5" />}
        />
        <KpiCard
          label="Pending Orders"
          value={kpis.pendingOrders}
          change="4 awaiting approval"
          icon={<ClipboardCheck className="h-5 w-5" />}
        />
        <KpiCard
          label="Top Moving Items"
          value={kpis.topMovingItems}
          change="90-day velocity"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold">Stock Levels Over Time</p>
              <p className="text-xs text-slate-500">Weekly inventory volume</p>
            </div>
          </CardHeader>
          <CardContent className="h-64">
            {!data ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.stockSeries}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="stock" stroke="#0d9488" strokeWidth={3} />
                  <Line type="monotone" dataKey="reorder" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold">Category Distribution</p>
              <p className="text-xs text-slate-500">SKU count by category</p>
            </div>
          </CardHeader>
          <CardContent className="h-64">
            {!data ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={data.categorySeries}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={90}
                    fill="#1e3a5f"
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_2fr]">
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold">Inventory Turnover</p>
              <p className="text-xs text-slate-500">By category</p>
            </div>
          </CardHeader>
          <CardContent className="h-64">
            {!data ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.turnoverSeries}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} />
                  <Tooltip />
                  <Bar dataKey="turnover" fill="#0d9488" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold">Recent Activity</p>
              <p className="text-xs text-slate-500">Last 30 days of movements</p>
            </div>
          </CardHeader>
          <CardContent>
            {!data ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-6" />
                ))}
              </div>
            ) : (
              <ActivityFeed items={activities} />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold">Notifications & Alerts</p>
              <p className="text-xs text-slate-500">Smart rules & approvals</p>
            </div>
          </CardHeader>
          <CardContent>
            <NotificationCenter items={notifications} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <p className="text-sm font-semibold">Onboarding</p>
              <p className="text-xs text-slate-500">Interactive tour checklist</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-800">
              Start a guided tour to configure reorder points, invite staff, and connect suppliers.
            </div>
            <button className="w-full rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white">
              Launch Product Tour
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
