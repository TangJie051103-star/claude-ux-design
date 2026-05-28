import Button from "@/components/ui/Button";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-8 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500">
            <span className="text-2xl font-bold text-white">UX</span>
          </div>
          <h1 className="mb-2 text-2xl text-slate-900 dark:text-slate-100">设计预览环境</h1>
          <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
            React + Vite + Tailwind CSS + shadcn/ui
            <br />
            设计系统：indigo · Inter · 4px 基准
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button>开始设计</Button>
            <Button intent="secondary">查看文档</Button>
            <Button intent="outline">设计师入口</Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
