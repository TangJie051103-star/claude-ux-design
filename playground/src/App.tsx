import { Routes, Route, NavLink } from "react-router-dom";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import ThemeToggle from "@/components/ui/ThemeToggle";
import useRuntimeAxe from "@/hooks/useRuntimeAxe";
import Home from "@/pages/Home";
import Components from "@/pages/Components";
import Tokens from "@/pages/Tokens";

const NAV_ITEMS = [
  { to: "/", label: "首页" },
  { to: "/components", label: "组件" },
  { to: "/tokens", label: "设计规范" },
];

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `rounded-button px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
  }`;
}

export default function App() {
  useRuntimeAxe();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
          <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-2 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
            <div className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === "/"} className={navLinkClass}>
                  {item.label}
                </NavLink>
              ))}
            </div>
            <ThemeToggle />
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/components" element={<Components />} />
              <Route path="/tokens" element={<Tokens />} />
            </Routes>
          </main>
        </div>
    </ErrorBoundary>
  );
}
