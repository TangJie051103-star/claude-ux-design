import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom 未实现 canvas API，axe-core 遍历 DOM 时可能触发 getContext 调用
// 直接覆盖原型方法消除 "Not implemented" 警告
HTMLCanvasElement.prototype.getContext = () => null;
HTMLCanvasElement.prototype.toDataURL = () => "";
HTMLCanvasElement.prototype.toBlob = () => {};

afterEach(() => {
  cleanup();
});
