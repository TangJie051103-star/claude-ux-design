import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("合并多个 class", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("过滤 falsy 值", () => {
    const isHidden = false;
    expect(cn("px-4", isHidden && "hidden", undefined, null, "py-2")).toBe("px-4 py-2");
  });

  it("tailwind-merge 覆盖冲突", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("条件 class 对象形式", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });
});
