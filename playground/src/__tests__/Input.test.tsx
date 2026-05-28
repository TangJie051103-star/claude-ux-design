import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import Input from "@/components/ui/Input";

describe("Input", () => {
  it("渲染默认输入框", () => {
    render(<Input placeholder="请输入" />);
    expect(screen.getByPlaceholderText("请输入")).toBeInTheDocument();
  });

  it("带 label 渲染", () => {
    render(<Input label="邮箱" placeholder="user@example.com" />);
    expect(screen.getByLabelText("邮箱")).toBeInTheDocument();
  });

  it("显示错误消息", () => {
    render(<Input label="邮箱" error="格式不正确" />);
    expect(screen.getByRole("alert")).toHaveTextContent("格式不正确");
    expect(screen.getByLabelText("邮箱")).toHaveAttribute("aria-invalid", "true");
  });

  it("disabled 状态不可交互", () => {
    render(<Input label="邮箱" disabled />);
    expect(screen.getByLabelText("邮箱")).toBeDisabled();
  });

  it("输入事件触发 onChange", async () => {
    const handleChange = vi.fn();
    render(<Input label="邮箱" onChange={handleChange} />);
    await userEvent.setup().type(screen.getByLabelText("邮箱"), "a");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("无无障碍违规（正常态）", async () => {
    const { container } = render(<Input label="邮箱" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("无无障碍违规（错误态）", async () => {
    const { container } = render(<Input label="邮箱" error="格式不正确" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
