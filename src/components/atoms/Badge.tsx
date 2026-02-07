import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
  danger: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
  info: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100"
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof variants;
};

export function Badge({ className, variant = "info", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
