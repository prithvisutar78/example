import { Activity } from "@/data/mockData";

interface ActivityFeedProps {
  items: Activity[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-3">
          <div className="mt-1 h-2 w-2 rounded-full bg-brand-emerald" />
          <div>
            <p className="text-sm text-slate-700 dark:text-slate-200">
              {item.action}
            </p>
            <p className="text-xs text-slate-400">
              {new Date(item.time).toLocaleString()} · {item.user}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
