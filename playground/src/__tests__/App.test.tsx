import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { axe } from "vitest-axe";
import App from "@/App";

function renderApp(initialRoute = "/") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App", () => {
  it("渲染导航链接", () => {
    renderApp();
    expect(screen.getByRole("link", { name: "首页" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "组件" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "设计规范" })).toBeInTheDocument();
  });

  it("默认路由 / 渲染首页内容", () => {
    renderApp();
    expect(screen.getByText("设计预览环境")).toBeInTheDocument();
  });

  it("/components 路由渲染组件展示页", () => {
    renderApp("/components");
    expect(screen.getByText("组件展示")).toBeInTheDocument();
  });

  it("/tokens 路由渲染设计规范页", () => {
    renderApp("/tokens");
    expect(screen.getByText("设计 Token")).toBeInTheDocument();
  });

  it("无障碍：首页无 a11y violations", async () => {
    const { container } = renderApp();
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("无障碍：组件页无 a11y violations", async () => {
    const { container } = renderApp("/components");
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("无障碍：设计规范页无 a11y violations", async () => {
    const { container } = renderApp("/tokens");
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
