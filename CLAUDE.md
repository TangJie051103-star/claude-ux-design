# UX 设计师项目配置

## 角色

用户是一名 UX 设计初学者，在学习和实践中。Claude 的角色是设计助手——帮助将想法转化为设计方案、原型和代码。**改动时解释「为什么」**，帮助用户在设计过程中学习。

## 可用的设计技能

本目录下已配置的技能和 MCP 工具：

| 技能/工具         | 类型 | 用途                                                          | 触发方式                                |
| ----------------- | ---- | ------------------------------------------------------------- | --------------------------------------- |
| `ui-ux-pro-max`   | 技能 | UI/UX 设计知识库（67 风格、96 配色、57 字体搭配、99 UX 准则） | 设计、review、改进 UI/UX 代码时自动参考 |
| `design-is`       | 技能 | 基于 Dieter Rams 十原则的结构化设计评审，输出改进行动计划     | 设计评审、audit、critique 时使用        |
| `frontend-design` | 技能 | 生产级前端界面设计与实现，注重独特美学                        | 需要构建完整页面/组件时                 |
| `report-builder`  | 技能 | 设计文档、分析报告、会议记录（支持转 PDF/DOCX）               | 需要输出文档时                          |
| `Pencil MCP`      | 工具 | 可视化设计原型（.pen 文件），支持导出 PNG                     | 任何设计/UI/原型/线框图需求时自动启动   |
| `Figma MCP`       | 工具 | 读取 Figma 文件数据和导出图片资源                             | 有 Figma 链接或需要提取设计稿资源时     |

---

## 设计系统（初学者默认值）

> ⚠️ 以下为学习期默认值，你可随时修改。

### 颜色

默认使用 **Tailwind CSS 色板**：

- Primary（主色）：`indigo` 系列
- Neutral（中性色）：`slate` 系列
- Danger（危险/删除）：`red` 系列
- Success（成功）：`emerald` 系列
- Warning（警告）：`amber` 系列

如需品牌色，替换这里即可。

### 字体

| 用途    | 字体             | 备选                  |
| ------- | ---------------- | --------------------- |
| UI 正文 | Inter            | system-ui, sans-serif |
| 标题    | Playfair Display | Georgia, serif        |
| 代码    | JetBrains Mono   | Fira Code, monospace  |

- 正文字号：移动端 ≥ 16px，桌面端 16-18px
- 行高：正文 1.5-1.75，标题 1.2-1.3
- 行长：控制在 65-75 字符

### 间距（4px 基准）

```
4, 8, 12, 16, 24, 32, 48, 64, 96
```

### 圆角

- 按钮 / 输入框：8px（默认）
- 卡片：12px
- 模态框：16px

### 阴影

| 层级 | 使用场景 |
| ---- | -------- |
| `sm` | 卡片悬停 |
| `md` | 下拉菜单 |
| `lg` | 模态框   |
| `xl` | 极少使用 |

### 性能基准

- Lighthouse Performance 评分 ≥ 90
- FCP（First Contentful Paint）< 1.8s
- LCP（Largest Contentful Paint）< 2.5s
- TBT（Total Blocking Time）< 200ms
- 图片格式优先 WebP，大图提供 `srcset` 响应式尺寸
- 无 404 请求、无 `console.error`

---

## 技术栈默认值

进行 Web 界面设计时，默认使用：

- **框架**：React（Vite 创建）
- **样式**：Tailwind CSS
- **组件库**：shadcn/ui
- **图标**：Lucide React
- **原型**：Pencil（.pen 文件）

除非项目另有要求，按上述默认值执行。

> **快速创建项目**：运行 `.\scripts\create-project.ps1 -ProjectName "项目名"` 一键搭建完整技术栈。
> 创建项目后，`npm run format` 自动格式化代码，`npx shadcn@latest add <组件名>` 按需添加 shadcn 组件。

---

## 代码规范

> 具体代码示例见 [docs/code-examples.md](docs/code-examples.md)

### TypeScript

- `strict: true`，用 `interface` 定义 Props，避免 `any`
- 组件默认导出，工具函数命名导出；嵌套访问用 `?.` 和 `??`

### React

- 单文件单组件，文件名 = 组件名（PascalCase）
- hooks 顺序：`useState` → `useEffect` → 自定义 hooks → 事件处理 → 条件渲染
- 事件命名：`handle` + 动作 + 对象（`handleMenuOpen`、`handleFormSubmit`）
- 条件渲染优先 `&&` / 三元，复杂逻辑抽成变量

### Tailwind CSS

- class 顺序：布局 → 尺寸 → 外观 → 文字 → 其他
- 移动端优先，`sm:` → `md:` → `lg:` → `xl:` 递增覆盖
- 重复样式用 `cva`（class-variance-authority），超过 8-10 个 class 考虑拆分

### 组件组织

- **拆**：有独立状态/逻辑、JSX 重复 ≥3 次、文件 >150 行
- **不拆**：纯美化、仅用一次且无独立逻辑
- **状态**：单组件 `useState` → 父子传 props → 跨页面 `useContext`/Zustand
- **目录**：`ui/` → `layout/` → `features/` → `shared/`（详见示例文件）

### 可访问性（A11y）

- [ ] 对比度 ≥ 4.5:1（正文）/ ≥ 3:1（大文字）
- [ ] Tab 可聚焦，Enter/Space 激活，Escape 关闭
- [ ] 图标按钮 `aria-label`，表单有 `<label>`，动态内容 `aria-live`
- [ ] 模态框焦点管理，`:focus-visible` 焦点环
- [ ] `<img>` 有 `alt`，装饰图片 `alt=""`

### 错误与边界情况

| 状态   | 处理                |
| ------ | ------------------- |
| 加载中 | `Skeleton` 占位     |
| 空数据 | 空态插图 + 引导文字 |
| 错误   | 错误消息 + 重试按钮 |
| 正常   | 数据展示            |

- `ErrorBoundary` 包裹每个路由，表单校验错误放字段下方（不用 alert）

---

## 质量保证（硬性要求）

> 以下规则在**每次提交代码前**必须逐条确认，不允许跳过。

### 编码时

1. **TypeScript 零 `any`**：除非确实无法推断（如第三方库无类型），否则不用 `any`。用 `unknown` + 类型守卫代替
2. **不要复制粘贴代码**：同一逻辑出现第 2 次就提取，不要等到第 3 次
3. **不要留 TODO**：写了就做完，或者不写。不允许 `// TODO: fix later`
4. **不要提交未使用的代码**：未使用的 import、变量、函数一律删除

### 写完代码后（逐条检查）

- [ ] **TypeScript 编译零错误**：`npm run build` 必须通过，不允许 `as any` 强制绕过
- [ ] **ESLint 零警告**：`npm run lint` 通过，禁止 `eslint-disable` 注释（除非有充分理由并注释说明）
- [ ] **组件四态完整**：每个涉及异步数据的组件都有 loading / empty / error / normal 四种状态
- [ ] **A11y 检查通过**：
  - 所有 `<img>` 有 `alt`
  - 所有图标按钮有 `aria-label`
  - 所有表单输入有 `<label>` 关联
  - Tab 键可完成核心操作流程
- [ ] **响应式不崩**：320px / 768px / 1280px 三个宽度下 UI 不溢出、不错位
- [ ] **控制台零报错**：`npm run dev` 打开浏览器，Console 无红色错误，无 React key 警告

### 绝对禁止

- ❌ `as any` 强制转换绕过类型检查
- ❌ `eslint-disable` 无注释说明原因
- ❌ `// TODO` 留在代码里
- ❌ 提交未使用的 import / 变量 / 函数
- ❌ 空 catch 块：`catch (e) {}`
- ❌ 硬编码敏感信息（API key、token）

---

## 测试规范

### 覆盖要求

| 目录                       | 要求                       |
| -------------------------- | -------------------------- |
| `src/components/ui/`       | 所有组件必须有测试         |
| `src/components/features/` | 含异步逻辑的组件必须有测试 |
| `src/hooks/`               | 自定义 hook 必须有测试     |

### 测试内容

每个组件测试至少覆盖：

- **渲染**：默认 props 正确渲染
- **交互**：点击、输入等核心事件
- **变体**：variant / size 等 props 应用正确样式
- **边界**：disabled、空数据等边界状态

### 测试技术栈

- **测试框架**：Vitest（与 Vite 共享配置）
- **组件测试**：@testing-library/react + user-event
- **断言扩展**：@testing-library/jest-dom
- **运行**：`npm run test`（单次）、`npm run test:watch`（监视模式）

### 示例

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "@/components/ui/Button";

describe("Button", () => {
  it("渲染默认按钮", () => {
    render(<Button>点击</Button>);
    expect(screen.getByRole("button", { name: "点击" })).toBeInTheDocument();
  });
});
```

---

## 设计原则

1. **无障碍优先**：对比度≥4.5:1，可聚焦可见，关键交互有 aria
2. **移动端优先**：先设计 320px 窄屏，再扩展到桌面
3. **少即是多**：不给初学者引入过度复杂的模式，优先选择简单、可维护的方案
4. **可解释**：每个设计决定都应能说清原因

---

## Git 工作流

### 分支命名

`type/description` 格式，例如：

- `feat/user-profile` — 新功能
- `fix/button-hover` — 修复
- `refactor/form-layout` — 重构

### Commit Message

参考 Conventional Commits：

```
type(scope): description
```

类型：`feat` / `fix` / `refactor` / `style` / `docs` / `test` / `chore`

### 提交流程

1. `npm run check` — TypeScript + ESLint
2. `npm run test` — 测试通过
3. `git add` — 暂存改动
4. `git commit` — 提交

> 不通过检查的代码不允许提交。

---

## 工作流约定

1. **先描述再实现**：设计方案时，先用文字说明思路，确认方向后再写代码
2. **原型先行**：涉及 UI 布局时，自然调用 Pencil 画线框图/原型（工具已自动允许，无需手动启用）
3. **解释原因**：修改设计时简要说明为什么这样改——帮助学习
4. **中文交流**：所有对话使用中文

---

## 自定义区

等你有了自己的偏好，可以修改以下内容：

- [ ] 品牌色/个性色板 → 替换上面的颜色部分
- [ ] 喜欢的字体组合 → 替换字体部分
- [ ] 偏好的设计风格（极简/玻璃态/粗野主义等）→ 添加风格倾向
- [ ] 常用组件库 → 替换技术栈
- [ ] 个人设计原则 → 补充到设计原则部分
- [ ] 常用设计工具（Figma 链接/设计稿路径等）
