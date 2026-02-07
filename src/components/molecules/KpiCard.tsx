import { ReactNode } from "react";
import { Card, CardContent } from "@/components/atoms/Card";

interface KpiCardProps {
  label: string;
  value: string | number;
  change: string;
  icon: ReactNode;
}

export function KpiCard({ label, value, change, icon }: KpiCardProps) {
  return (
    <Card className="min-h-[120px]">
      <CardContent className="flex h-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            {label}
          </p>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
            {icon}
          </div>
        </div>
        <div>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">
            {value}
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            {change}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
