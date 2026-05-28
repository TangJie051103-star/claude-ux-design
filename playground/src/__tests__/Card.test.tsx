import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import Card from "@/components/ui/Card";

describe("Card", () => {
  it("渲染默认 div 卡片", () => {
    render(<Card>内容</Card>);
    expect(screen.getByText("内容")).toBeInTheDocument();
  });

  it("合并自定义 className", () => {
    render(<Card className="p-8">内容</Card>);
    const el = screen.getByText("内容");
    expect(el).toHaveClass("p-8");
    expect(el).toHaveClass("rounded-card");
  });

  it("使用 as 渲染为 section", () => {
    render(<Card as="section">区域</Card>);
    const el = screen.getByText("区域");
    expect(el.tagName).toBe("SECTION");
  });

  it("无无障碍违规", async () => {
    const { container } = render(<Card>内容</Card>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
