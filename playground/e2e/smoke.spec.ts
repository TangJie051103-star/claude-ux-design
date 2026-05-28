import { test, expect } from "@playwright/test";

test("首页正常渲染", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("设计预览环境");
  await expect(page.getByRole("button", { name: "开始设计" })).toBeVisible();
  await expect(page.getByRole("button", { name: "查看文档" })).toBeVisible();
  await expect(page.getByRole("button", { name: "设计师入口" })).toBeVisible();
});

test("首页截图（视觉回归）", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("homepage.png", { fullPage: true });
});

test.describe("移动端", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("布局无横向溢出", async ({ page }) => {
    await page.goto("/");
    const body = page.locator("body");
    const box = await body.boundingBox();
    expect(box!.width).toBeLessThanOrEqual(375);
  });
});
