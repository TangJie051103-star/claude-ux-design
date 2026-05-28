import { type ElementType, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps<T extends ElementType = "div"> = {
  children: ReactNode;
  className?: string;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "className" | "children" | "as">;

export default function Card<T extends ElementType = "div">({
  children,
  className,
  as,
  ...props
}: CardProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cn(
        "rounded-card border border-slate-200 bg-white shadow-1 dark:border-slate-700 dark:bg-slate-900",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
