import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import App from "@/App";

describe("App", () => {
  it("渲染标题", () => {
    render(<App />);
    expect(screen.getByText("设计预览环境")).toBeInTheDocument();
  });

  it("渲染三个操作按钮", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: "开始设计" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "查看文档" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "设计师入口" })).toBeInTheDocument();
  });

  it("渲染技术栈说明", () => {
    render(<App />);
    expect(screen.getByText(/React \+ Vite \+ Tailwind CSS/)).toBeInTheDocument();
  });

  it("无障碍：无 a11y violations", async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
