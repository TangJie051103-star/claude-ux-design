import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// jsdom 未实现 canvas API，axe-core 遍历 DOM 时可能触发 getContext 调用
// 直接覆盖原型方法消除 "Not implemented" 警告
HTMLCanvasElement.prototype.getContext = () => null;
HTMLCanvasElement.prototype.toDataURL = () => "";
HTMLCanvasElement.prototype.toBlob = () => {};

// jsdom 未实现 window.matchMedia，mock 返回 prefers-color-scheme: light
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

afterEach(() => {
  cleanup();
});
