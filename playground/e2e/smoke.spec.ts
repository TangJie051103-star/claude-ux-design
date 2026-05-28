import { test, expect } from "@playwright/test";

test("首页正常渲染", async ({ page }) => {
  await page.goto("/");

  // 标题可见
  await expect(page.locator("h1")).toHaveText("设计预览环境");

  // 三个按钮存在
  await expect(page.getByRole("button", { name: "开始设计" })).toBeVisible();
  await expect(page.getByRole("button", { name: "查看文档" })).toBeVisible();
  await expect(page.getByRole("button", { name: "设计师入口" })).toBeVisible();
});

test("首页截图", async ({ page }) => {
  await page.goto("/");
  await page.screenshot({ path: "test-results/homepage.png", fullPage: true });
});
