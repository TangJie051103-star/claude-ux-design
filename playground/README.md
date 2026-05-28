# Playground — UX 设计预览环境

基于 React + Vite + Tailwind CSS 的 UX 设计系统预览与组件展示项目。

## 技术栈

| 类别 | 技术                                |
| ---- | ----------------------------------- |
| 框架 | React 19                            |
| 构建 | Vite 8                              |
| 样式 | Tailwind CSS 4                      |
| 组件 | 自定义组件库（参考 shadcn/ui 模式） |
| 图标 | Lucide React                        |
| 路由 | React Router DOM 7                  |
| 类型 | TypeScript 6（strict 模式）         |
| 测试 | Vitest + Testing Library            |
| E2E  | Playwright                          |
| A11y | axe-core（运行时 + 测试）           |
| 质量 | ESLint + Prettier + Husky           |

## 快速开始

```bash
npm install
npm run dev        # 开发服务器 → http://localhost:5173
```

## 可用脚本

| 命令                    | 说明                                |
| ----------------------- | ----------------------------------- |
| `npm run dev`           | 启动 Vite 开发服务器                |
| `npm run build`         | 生产构建                            |
| `npm run preview`       | 预览生产构建                        |
| `npm run check`         | TypeScript + ESLint + 测试 一次检查 |
| `npm run lint`          | ESLint 检查                         |
| `npm run lint:fix`      | ESLint 自动修复                     |
| `npm run format`        | Prettier 格式化                     |
| `npm run format:check`  | Prettier 格式检查                   |
| `npm run test`          | 运行单元测试                        |
| `npm run test:watch`    | 监视模式测试                        |
| `npm run test:coverage` | 测试覆盖率报告                      |
| `npm run e2e`           | Playwright E2E 测试                 |
| `npm run e2e:ui`        | Playwright UI 模式                  |
| `npm run audit`         | Lighthouse 性能审计                 |

## 设计系统

### 颜色

- **Primary**：Indigo（50-950 共 11 阶）
- **Success**：Emerald
- **Warning**：Amber
- **Error**：Red
- **Info**：Sky

支持亮色/暗色模式，偏好持久化到 localStorage。

### 字体

- 正文：Inter
- 标题：Playfair Display
- 代码：JetBrains Mono

### 设计 Token

访问 `/tokens` 查看完整设计规范，包括色板、字体、阴影、圆角等。

### 组件

访问 `/components` 查看组件展示页，包括 Button、ThemeToggle、ErrorBoundary、Card、Skeleton、Input 等。

## 项目结构

```
playground/
├── public/              # 静态资源
├── scripts/             # 工具脚本（Lighthouse 审计等）
├── e2e/                 # Playwright E2E 测试
└── src/
    ├── components/ui/   # 通用 UI 组件
    ├── pages/           # 路由页面
    ├── hooks/           # 自定义 hooks
    ├── lib/             # 工具函数
    └── __tests__/       # 单元测试
```

## 设计原则

1. **无障碍优先**：对比度 ≥ 4.5:1，键盘可操作，aria 标注
2. **移动端优先**：320px → 768px → 1280px
3. **少即是多**：简单、可维护、可解释
4. **四态完整**：每个组件覆盖 loading / empty / error / normal
