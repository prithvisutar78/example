import { Card, CardContent, CardHeader } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";

export function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Documents</h1>
          <p className="text-sm text-slate-500">
            Centralized repository for invoices, specs, and compliance files.
          </p>
        </div>
        <Button>Upload Document</Button>
      </div>

      <Card>
        <CardHeader>
          <div>
            <p className="text-sm font-semibold">Shared Library</p>
            <p className="text-xs text-slate-500">Searchable and versioned</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-800">
            No documents yet. Upload supplier specs or compliance certificates.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
