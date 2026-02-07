import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { reportCards as fallbackReports } from "@/data/mockData";

interface ReportResponse {
  reportCards: typeof fallbackReports;
}

export function Reports() {
  const [reports, setReports] = useState<typeof fallbackReports>([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/reports");
      const payload = (await response.json()) as ReportResponse;
      setReports(payload.reportCards);
    };
    load();
  }, []);

  const cards = reports.length ? reports : fallbackReports;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Reporting & Analytics</h1>
          <p className="text-sm text-slate-500">
            Pre-built insights for valuation, movement, and ABC classification.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>Export PDF</Button>
          <Button variant="secondary">Export Excel</Button>
          <Button variant="secondary">Schedule Email</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((report) => (
          <Card key={report.id}>
            <CardContent className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                {report.title}
              </p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                {report.value}
              </p>
              <p className="text-xs text-slate-500">{report.method}</p>
              <p className="text-xs text-emerald-500">{report.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div>
            <p className="text-sm font-semibold">Stock Movement History</p>
            <p className="text-xs text-slate-500">FIFO/LIFO/Weighted Average analysis</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-800">
            Export detailed movement logs or schedule automated delivery to finance.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
