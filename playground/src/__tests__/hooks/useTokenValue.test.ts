import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import useTokenValue from "@/hooks/useTokenValue";

describe("useTokenValue", () => {
  it("SSR 环境返回空字符串", () => {
    // jsdom 中 document 存在但 CSS 变量未设置，返回空字符串
    const { result } = renderHook(() => useTokenValue("--radius-button"));
    expect(typeof result.current).toBe("string");
  });

  it("读取存在的 CSS 变量", () => {
    document.documentElement.style.setProperty("--test-token", "2rem");
    const { result } = renderHook(() => useTokenValue("--test-token"));
    expect(result.current).toBe("2rem");
  });

  it("不存在的 CSS 变量返回空字符串", () => {
    const { result } = renderHook(() => useTokenValue("--non-existent"));
    expect(result.current).toBe("");
  });
});
