import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import Skeleton, { SkeletonText, SkeletonCircle, SkeletonButton } from "@/components/ui/Skeleton";

describe("Skeleton", () => {
  it("渲染默认骨架屏", () => {
    render(<Skeleton />);
    const el = screen.getByRole("status", { name: "加载中" });
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass("animate-pulse");
  });

  it("合并自定义 className", () => {
    render(<Skeleton className="h-8 w-48" />);
    expect(screen.getByRole("status")).toHaveClass("h-8");
    expect(screen.getByRole("status")).toHaveClass("w-48");
  });

  it("SkeletonText 渲染文本骨架", () => {
    render(<SkeletonText />);
    expect(screen.getByRole("status")).toHaveClass("h-4");
    expect(screen.getByRole("status")).toHaveClass("w-full");
  });

  it("SkeletonCircle 渲染圆形骨架", () => {
    render(<SkeletonCircle />);
    expect(screen.getByRole("status")).toHaveClass("rounded-full");
    expect(screen.getByRole("status")).toHaveClass("size-10");
  });

  it("SkeletonButton 渲染按钮骨架", () => {
    render(<SkeletonButton />);
    expect(screen.getByRole("status")).toHaveClass("rounded-button");
    expect(screen.getByRole("status")).toHaveClass("h-10");
  });

  it("无无障碍违规", async () => {
    const { container } = render(<Skeleton />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
