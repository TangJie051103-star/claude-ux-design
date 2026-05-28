import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import useRuntimeAxe from "@/hooks/useRuntimeAxe";

// axe-core 已经是真实安装的包，直接 spy window 上的 fetch 或 mock axe 模块
// 这里测试 hook 在 DEV 模式下的行为特征：不抛出错误、正常完成
describe("useRuntimeAxe", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("在 DEV 模式下不抛出错误", () => {
    // import.meta.env.DEV 在 vitest 中默认为 true
    const { result } = renderHook(() => useRuntimeAxe());
    expect(result.current).toBeUndefined();
  });

  it("返回 undefined（无返回值）", () => {
    const { result } = renderHook(() => useRuntimeAxe());
    expect(result.current).toBeUndefined();
  });

  it("不阻塞渲染", () => {
    const { result } = renderHook(() => useRuntimeAxe());
    // hook 正常执行完成，不抛出异常
    expect(result.current).toBeUndefined();
  });
});
