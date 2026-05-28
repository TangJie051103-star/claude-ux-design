import { mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(viteConfig, {
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    css: true,
    exclude: ["e2e/**", "node_modules/**"],
  },
});
