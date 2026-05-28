import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export default function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card border border-slate-200 bg-white shadow-1 dark:border-slate-700 dark:bg-slate-900",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
