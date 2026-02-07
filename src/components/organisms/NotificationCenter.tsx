import { Badge } from "@/components/atoms/Badge";

interface Notification {
  id: string;
  title: string;
  description: string;
  status: "read" | "unread";
}

interface NotificationCenterProps {
  items: Notification[];
}

export function NotificationCenter({ items }: NotificationCenterProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-800 dark:text-white">
              {item.title}
            </p>
            <Badge variant={item.status === "unread" ? "warning" : "info"}>
              {item.status === "unread" ? "New" : "Read"}
            </Badge>
          </div>
          <p className="mt-2 text-xs text-slate-500">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
