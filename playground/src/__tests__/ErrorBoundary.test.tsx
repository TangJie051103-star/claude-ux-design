import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

function ThrowError({ message = "test error" }: { message?: string }): never {
  throw new Error(message);
}

function GoodChild() {
  return <p>一切正常</p>;
}

describe("ErrorBoundary", () => {
  it("正常渲染子组件", () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>,
    );
    expect(screen.getByText("一切正常")).toBeInTheDocument();
  });

  it("捕获子组件错误并显示错误信息", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ThrowError message="组件崩溃了" />
      </ErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("组件崩溃了")).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it("显示自定义 fallback", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={<p>自定义错误页面</p>}>
        <ThrowError />
      </ErrorBoundary>,
    );
    expect(screen.getByText("自定义错误页面")).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it("无障碍：无 a11y violations（正常状态）", async () => {
    const { container } = render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("无障碍：无 a11y violations（错误状态）", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(
      <ErrorBoundary>
        <ThrowError message="a11y 测试错误" />
      </ErrorBoundary>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
    vi.restoreAllMocks();
  });
});
