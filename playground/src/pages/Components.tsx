import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { SkeletonText, SkeletonCircle, SkeletonButton } from "@/components/ui/Skeleton";
import Input from "@/components/ui/Input";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

const INTENTS = ["primary", "secondary", "outline", "ghost", "danger"] as const;
const SIZES = ["sm", "md", "lg"] as const;

const intentLabels: Record<string, string> = {
  primary: "主要",
  secondary: "次要",
  outline: "线框",
  ghost: "幽灵",
  danger: "危险",
};

const sizeLabels: Record<string, string> = {
  sm: "小",
  md: "中",
  lg: "大",
};

function ErrorTrigger() {
  const [explode, setExplode] = useState(false);
  if (explode) throw new Error("这是一个测试错误");
  return (
    <Button intent="danger" size="sm" onClick={() => setExplode(true)}>
      触发测试错误
    </Button>
  );
}

export default function Components() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">组件展示</h1>

      {/* Button 区块 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Button 按钮</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          5 种风格 × 3 种尺寸，共 15 种组合
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th
                  className="p-2 text-left text-sm text-slate-500 dark:text-slate-400"
                  scope="col"
                >
                  风格
                </th>
                {SIZES.map((size) => (
                  <th
                    key={size}
                    className="p-2 text-center text-sm text-slate-500 dark:text-slate-400"
                  >
                    {sizeLabels[size]} ({size})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INTENTS.map((intent) => (
                <tr key={intent}>
                  <td className="p-2 text-sm text-slate-600 dark:text-slate-400">
                    {intentLabels[intent]}
                  </td>
                  {SIZES.map((size) => (
                    <td key={size} className="p-2 text-center">
                      <Button intent={intent} size={size}>
                        按钮
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-2 text-sm text-slate-600 dark:text-slate-400">禁用态</td>
                {SIZES.map((size) => (
                  <td key={size} className="p-2 text-center">
                    <Button size={size} disabled>
                      按钮
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ThemeToggle 区块 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
          ThemeToggle 主题切换
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          点击图标切换亮色/暗色模式，偏好保存到 localStorage
        </p>
        <Card className="flex items-center gap-3 p-4">
          <ThemeToggle />
          <span className="text-sm text-slate-600 dark:text-slate-400">点击此处切换主题 →</span>
        </Card>
      </section>

      {/* ErrorBoundary 区块 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
          ErrorBoundary 错误边界
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          捕获子组件渲染错误，展示友好提示并提供重试
        </p>
        <Card className="p-6">
          <ErrorBoundary>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">当前状态：正常运行中</p>
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                组件正确挂载
              </div>
              <ErrorTrigger />
            </div>
          </ErrorBoundary>
        </Card>
      </section>

      {/* Card 区块 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Card 卡片</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          统一的卡片容器，支持 as prop 切换 HTML 标签
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-4">
            <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">默认卡片</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              使用默认 div 渲染，带有圆角和阴影
            </p>
          </Card>
          <Card as="section" className="p-4">
            <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">section 卡片</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              使用 as="section" 渲染为语义化标签
            </p>
          </Card>
        </div>
      </section>

      {/* Skeleton 区块 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
          Skeleton 加载占位
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          四种变体：默认、文本、圆形、按钮
        </p>
        <Card className="space-y-4 p-6">
          <div className="flex items-center gap-3">
            <SkeletonCircle />
            <div className="flex-1 space-y-2">
              <SkeletonText className="w-3/4" />
              <SkeletonText className="w-1/2" />
            </div>
          </div>
          <div className="flex gap-3">
            <SkeletonButton />
            <SkeletonButton className="w-32" />
          </div>
        </Card>
      </section>

      {/* Input 区块 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Input 输入框</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          支持 label、error、disabled 状态
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="space-y-4 p-4">
            <Input label="邮箱" placeholder="user@example.com" />
            <Input label="密码" type="password" placeholder="请输入密码" />
          </Card>
          <Card className="space-y-4 p-4">
            <Input label="用户名" error="用户名已被占用" defaultValue="admin" />
            <Input label="禁用状态" disabled value="不可编辑" />
          </Card>
        </div>
      </section>
    </div>
  );
}
