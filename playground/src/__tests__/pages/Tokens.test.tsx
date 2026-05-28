import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import Tokens from "@/pages/Tokens";

describe("Tokens", () => {
  it("渲染页面标题", () => {
    render(<Tokens />);
    expect(screen.getByText("设计 Token")).toBeInTheDocument();
  });

  it("渲染色板区块", () => {
    render(<Tokens />);
    const palettes = screen.getAllByText(/色板/);
    expect(palettes.length).toBeGreaterThan(0);
  });

  it("渲染字体区块", () => {
    render(<Tokens />);
    expect(screen.getByText("字体")).toBeInTheDocument();
  });

  it("渲染阴影区块", () => {
    render(<Tokens />);
    expect(screen.getByText(/阴影/)).toBeInTheDocument();
  });

  it("渲染圆角区块", () => {
    render(<Tokens />);
    expect(screen.getByText("圆角")).toBeInTheDocument();
  });

  it("无障碍：无 a11y violations", async () => {
    const { container } = render(<Tokens />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
