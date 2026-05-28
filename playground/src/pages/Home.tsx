import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-8 dark:bg-slate-950">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500">
          <span className="text-2xl font-bold text-white">UX</span>
        </div>
        <h1 className="mb-2 text-2xl text-slate-900 dark:text-slate-100">设计预览环境</h1>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          React + Vite + Tailwind CSS + 自定义组件
          <br />
          设计系统：indigo · Inter · 4px 基准
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button>开始设计</Button>
          <Button intent="secondary">查看文档</Button>
          <Button intent="outline">设计师入口</Button>
        </div>
      </Card>
    </div>
  );
}
