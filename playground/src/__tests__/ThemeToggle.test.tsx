import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import ThemeToggle from "@/components/ui/ThemeToggle";

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});

describe("ThemeToggle", () => {
  it("默认渲染为亮色模式（Moon 图标）", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "切换到暗色模式" })).toBeInTheDocument();
  });

  it("点击切换为暗色模式（Sun 图标）", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button", { name: "切换到亮色模式" })).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("localStorage 持久化主题偏好", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(screen.getByRole("button"));
    expect(localStorage.getItem("theme")).toBe("dark");
    await user.click(screen.getByRole("button"));
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("从 localStorage 读取偏好初始化", () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "切换到亮色模式" })).toBeInTheDocument();
  });

  it("无障碍：无 a11y violations", async () => {
    const { container } = render(<ThemeToggle />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("无障碍：暗色模式下无 a11y violations", async () => {
    localStorage.setItem("theme", "dark");
    const { container } = render(<ThemeToggle />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
