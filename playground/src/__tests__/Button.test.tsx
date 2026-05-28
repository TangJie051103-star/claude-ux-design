import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import Button from "@/components/ui/Button";

describe("Button", () => {
  it("默认渲染 primary 意图按钮", () => {
    render(<Button>点击我</Button>);
    const btn = screen.getByRole("button", { name: "点击我" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass("bg-primary-600");
  });

  it("intent 变体应用正确的样式类", () => {
    const { rerender } = render(<Button intent="danger">删除</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-red-600");

    rerender(<Button intent="secondary">取消</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-slate-100");

    rerender(<Button intent="outline">编辑</Button>);
    expect(screen.getByRole("button")).toHaveClass("border");
  });

  it("size 变体应用正确的尺寸类", () => {
    const { rerender } = render(<Button size="sm">小</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8");

    rerender(<Button size="lg">大</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-12");
  });

  it("点击时触发 onClick", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>提交</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disabled 状态下不触发点击", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={handleClick}>
        禁用
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("合并自定义 className", () => {
    render(<Button className="custom-class">自定义</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("支持 forwardRef", () => {
    let ref: HTMLButtonElement | null = null;
    render(
      <Button
        ref={(el) => {
          ref = el;
        }}
      >
        Ref 测试
      </Button>,
    );
    expect(ref).toBeInstanceOf(HTMLButtonElement);
  });

  it("无障碍：无 a11y violations", async () => {
    const { container } = render(<Button>无障碍按钮</Button>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
