import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import Label from "@/components/ui/Label";

describe("Label", () => {
  it("渲染标签文字", () => {
    render(<Label>邮箱</Label>);
    expect(screen.getByText("邮箱")).toBeInTheDocument();
    expect(screen.getByText("邮箱").tagName).toBe("LABEL");
  });

  it("关联 htmlFor 到 input", () => {
    render(
      <div>
        <Label htmlFor="email">邮箱</Label>
        <input id="email" />
      </div>,
    );
    expect(screen.getByLabelText("邮箱")).toBeInTheDocument();
  });

  it("无无障碍违规", async () => {
    const { container } = render(<Label htmlFor="test">标签</Label>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
