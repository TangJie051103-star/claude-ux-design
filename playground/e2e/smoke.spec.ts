import { test, expect } from "@playwright/test";

// ==================== 首页基础 ====================

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

// ==================== 移动端 ====================

test.describe("移动端", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("布局无横向溢出", async ({ page }) => {
    await page.goto("/");
    const body = page.locator("body");
    const box = await body.boundingBox();
    expect(box!.width).toBeLessThanOrEqual(375);
  });
});

// ==================== 响应式断点 ====================

test.describe("响应式断点", () => {
  const viewports = [320, 768, 1280];

  for (const width of viewports) {
    test(`${width}px 布局不溢出`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      const body = page.locator("body");
      const box = await body.boundingBox();
      expect(box!.width).toBeLessThanOrEqual(width);
    });
  }
});

// ==================== 主题切换 ====================

test.describe("主题切换", () => {
  test("从亮色切换到暗色模式", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "切换到暗色模式" });
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.getByRole("button", { name: "切换到亮色模式" })).toBeVisible();
    const stored = await page.evaluate(() => localStorage.getItem("theme"));
    expect(stored).toBe("dark");
  });

  test("从暗色切换回亮色模式", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);
    const toggle = page.getByRole("button", { name: "切换到亮色模式" });
    await toggle.click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    const stored = await page.evaluate(() => localStorage.getItem("theme"));
    expect(stored).toBe("light");
  });

  test("系统偏好 dark 模式下自动进入暗色", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});

// ==================== 键盘导航 ====================

test.describe("键盘导航", () => {
  test("Tab 键聚焦导航和页面按钮", async ({ page }) => {
    await page.goto("/");
    // 3 个导航链接 → ThemeToggle → 3 个操作按钮
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "首页" })).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "组件" })).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "设计规范" })).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: /切换/ })).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "开始设计" })).toBeFocused();
  });

  test("Enter 键激活聚焦的链接", async ({ page }) => {
    await page.goto("/");
    // 聚焦"组件"链接并激活
    await page.keyboard.press("Tab"); // 首页
    await page.keyboard.press("Tab"); // 组件
    await expect(page.getByRole("link", { name: "组件" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("h1")).toHaveText("组件展示");
  });
});

// ==================== 暗色模式视觉回归 ====================

test.describe("暗色模式视觉回归", () => {
  test("暗色模式截图", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page).toHaveScreenshot("homepage-dark.png", { fullPage: true });
  });
});

// ==================== 路由页面 ====================

test.describe("路由页面", () => {
  test("/components 渲染组件展示页", async ({ page }) => {
    await page.goto("/components");
    await expect(page.locator("h1")).toHaveText("组件展示");
    // Button 矩阵中至少有一个按
    await expect(page.getByRole("button", { name: "按钮" }).first()).toBeVisible();
  });

  test("/tokens 渲染设计规范页", async ({ page }) => {
    await page.goto("/tokens");
    await expect(page.locator("h1")).toHaveText("设计 Token");
    await expect(page.getByText(/色板/)).toBeVisible();
  });
});
