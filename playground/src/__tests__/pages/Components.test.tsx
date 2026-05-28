import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import Components from "@/pages/Components";

describe("Components", () => {
  it("渲染页面标题", () => {
    render(<Components />);
    expect(screen.getByText("组件展示")).toBeInTheDocument();
  });

  it("渲染 Button 区块", () => {
    render(<Components />);
    expect(screen.getByText("Button 按钮")).toBeInTheDocument();
    expect(screen.getByText("5 种风格 × 3 种尺寸，共 15 种组合")).toBeInTheDocument();
  });

  it("渲染 ThemeToggle 区块", () => {
    render(<Components />);
    expect(screen.getByText("ThemeToggle 主题切换")).toBeInTheDocument();
  });

  it("渲染 ErrorBoundary 区块", () => {
    render(<Components />);
    expect(screen.getByText("ErrorBoundary 错误边界")).toBeInTheDocument();
  });

  it("渲染所有 Button 变体", () => {
    render(<Components />);
    const buttons = screen.getAllByRole("button", { name: "按钮" });
    expect(buttons.length).toBeGreaterThanOrEqual(15);
  });

  it("无障碍：无 a11y violations", async () => {
    const { container } = render(<Components />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
