import useTokenValue from "@/hooks/useTokenValue";
import Card from "@/components/ui/Card";
import { primaryPalette, semanticPalettes, shadows } from "@/lib/tokens";

const PRIMARY_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const FONT_SAMPLES = [
  {
    name: "正文 (Inter)",
    var: "--font-sans",
    text: "设计就是发现问题并优雅地解决它。",
    cls: "font-sans",
  },
  {
    name: "标题 (Playfair Display)",
    var: "--font-heading",
    text: "Design is Problem Solving",
    cls: "font-heading",
  },
  {
    name: "代码 (JetBrains Mono)",
    var: "--font-mono",
    text: "const design = await solve(problem);",
    cls: "font-mono",
  },
];

const SHADOW_LEVELS = [1, 2, 3, 4, 5];

const SHADOW_LABELS: Record<number, string> = {
  1: "卡片悬停",
  2: "下拉菜单",
  3: "模态框",
  4: "极少使用",
  5: "极少使用",
};

const RADIUS_TOKENS = ["--radius-button", "--radius-card", "--radius-modal"] as const;

const radiusLabels: Record<string, string> = {
  "--radius-button": "Button 按钮",
  "--radius-card": "Card 卡片",
  "--radius-modal": "Modal 模态框",
};

interface TokenDemoProps {
  label: string;
  token: string;
  desc: string;
}

function TransitionDemo({ label, token, desc }: TokenDemoProps) {
  const value = useTokenValue(token);
  return (
    <Card className="flex items-center gap-4 p-4">
      <div
        className="h-3 w-16 rounded-full bg-primary-500 transition-all hover:w-24"
        style={{ transitionDuration: value || "200ms" }}
      />
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label} — {value || "..."}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
      </div>
    </Card>
  );
}

function ZIndexDemo({ label, token, desc }: TokenDemoProps) {
  const value = useTokenValue(token);
  return (
    <Card className="flex items-center gap-4 p-4">
      <span className="flex h-8 w-8 items-center justify-center rounded bg-primary-100 text-xs font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-300">
        {value || "..."}
      </span>
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
      </div>
    </Card>
  );
}

function RadiusDemo({ token }: { token: string }) {
  const value = useTokenValue(token);

  return (
    <div className="space-y-2">
      <div
        className="flex h-16 items-center justify-center border-2 border-dashed border-primary-400 bg-primary-50 text-sm font-medium text-primary-700 dark:border-primary-600 dark:bg-primary-950 dark:text-primary-300"
        style={{ borderRadius: value || "0.5rem" }}
      >
        {radiusLabels[token]}
      </div>
      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        {value || "加载中..."}
      </p>
    </div>
  );
}

function ShadowCard({ level }: { level: number }) {
  return (
    <Card
      className="p-4 dark:border-slate-600 dark:bg-slate-800"
      style={{ boxShadow: shadows[level] }}
    >
      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">shadow-{level}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{SHADOW_LABELS[level]}</p>
    </Card>
  );
}

export default function Tokens() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">设计 Token</h1>

      {/* 色板 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
          色板 · Primary (indigo)
        </h2>
        <div className="grid grid-cols-11 gap-1">
          {PRIMARY_SHADES.map((shade) => (
            <div key={shade} className="space-y-1 text-center">
              <div
                className="h-12 rounded border border-slate-200 dark:border-slate-700"
                style={{ backgroundColor: primaryPalette[shade] }}
              />
              <span className="text-xs text-slate-500 dark:text-slate-400">{shade}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 语义色板 */}
      {Object.entries(semanticPalettes).map(([prefix, palette]) => (
        <section key={prefix} className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
            色板 · {palette.name}
          </h2>
          <div className="grid grid-cols-11 gap-1">
            {PRIMARY_SHADES.map((shade) => (
              <div key={shade} className="space-y-1 text-center">
                <div
                  className="h-12 rounded border border-slate-200 dark:border-slate-700"
                  style={{ backgroundColor: palette.colors[shade] }}
                />
                <span className="text-xs text-slate-500 dark:text-slate-400">{shade}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* 字体 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">字体</h2>
        <div className="space-y-4">
          {FONT_SAMPLES.map((f) => (
            <Card key={f.name} className="p-4">
              <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">{f.name}</p>
              <p className={`text-lg text-slate-900 dark:text-slate-100 ${f.cls}`}>{f.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 阴影 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">阴影 · 5 级</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {SHADOW_LEVELS.map((level) => (
            <ShadowCard key={level} level={level} />
          ))}
        </div>
      </section>

      {/* 圆角 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">圆角</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {RADIUS_TOKENS.map((token) => (
            <RadiusDemo key={token} token={token} />
          ))}
        </div>
      </section>

      {/* 过渡 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">过渡 · 3 级</h2>
        <div className="space-y-3">
          <TransitionDemo
            label="fast"
            token="--transition-fast"
            desc="按钮 hover、图标切换（150ms）"
          />
          <TransitionDemo label="base" token="--transition-base" desc="标准过渡（200ms）" />
          <TransitionDemo
            label="slow"
            token="--transition-slow"
            desc="模态框进出、页面过渡（300ms）"
          />
        </div>
      </section>

      {/* z-index */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
          z-index · 4 层级
        </h2>
        <div className="space-y-3">
          <ZIndexDemo label="nav" token="--z-nav" desc="导航栏（10）" />
          <ZIndexDemo label="dropdown" token="--z-dropdown" desc="下拉菜单（20）" />
          <ZIndexDemo label="modal" token="--z-modal" desc="模态框（30）" />
          <ZIndexDemo label="tooltip" token="--z-tooltip" desc="提示框（40）" />
        </div>
      </section>
    </div>
  );
}
