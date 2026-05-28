import { useState } from "react";
import Button from "@/components/ui/Button";
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
                <th className="p-2 text-left text-sm text-slate-500 dark:text-slate-400" scope="col">
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
        <div className="flex items-center gap-3 rounded-card border border-slate-200 bg-white p-4 shadow-1 dark:border-slate-700 dark:bg-slate-900">
          <ThemeToggle />
          <span className="text-sm text-slate-600 dark:text-slate-400">
            点击此处切换主题 →
          </span>
        </div>
      </section>

      {/* ErrorBoundary 区块 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
          ErrorBoundary 错误边界
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          捕获子组件渲染错误，展示友好提示并提供重试
        </p>
        <div className="rounded-card border border-slate-200 bg-white p-6 shadow-1 dark:border-slate-700 dark:bg-slate-900">
          <ErrorBoundary>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                当前状态：正常运行中
              </p>
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                组件正确挂载
              </div>
              <ErrorTrigger />
            </div>
          </ErrorBoundary>
        </div>
      </section>
    </div>
  );
}
