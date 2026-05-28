import useTokenValue from "@/hooks/useTokenValue";

const PRIMARY_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const FONT_SAMPLES = [
  { name: "正文 (Inter)", var: "--font-sans", text: "设计就是发现问题并优雅地解决它。", cls: "font-sans" },
  {
    name: "标题 (Playfair Display)",
    var: "--font-heading",
    text: "Design is Problem Solving",
    cls: "font-heading",
  },
  { name: "代码 (JetBrains Mono)", var: "--font-mono", text: "const design = await solve(problem);", cls: "font-mono" },
];

const SHADOW_LEVELS = [1, 2, 3, 4, 5];

const RADIUS_TOKENS = ["--radius-button", "--radius-card", "--radius-modal"] as const;

const radiusLabels: Record<string, string> = {
  "--radius-button": "Button 按钮",
  "--radius-card": "Card 卡片",
  "--radius-modal": "Modal 模态框",
};

function ShadowCard({ level }: { level: number }) {
  const shadowClass = `shadow-${level}`;

  return (
    <div
      className={`rounded-card border border-slate-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-800 ${shadowClass}`}
    >
      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">shadow-{level}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">卡片悬停 / 下拉 / 模态框</p>
    </div>
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
      <p className="text-center text-xs text-slate-500 dark:text-slate-400">{value || "加载中..."}</p>
    </div>
  );
}

export default function Tokens() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">设计 Token</h1>

      {/* 色板 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">色板 · Primary (indigo)</h2>
        <div className="grid grid-cols-11 gap-1">
          {PRIMARY_SHADES.map((shade) => (
            <div key={shade} className="space-y-1 text-center">
              <div
                className="h-12 rounded border border-slate-200 dark:border-slate-700"
                style={{ backgroundColor: `var(--color-primary-${shade})` }}
              />
              <span className="text-xs text-slate-500 dark:text-slate-400">{shade}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 字体 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">字体</h2>
        <div className="space-y-4">
          {FONT_SAMPLES.map((f) => (
            <div
              key={f.name}
              className="rounded-card border border-slate-200 bg-white p-4 shadow-1 dark:border-slate-700 dark:bg-slate-900"
            >
              <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">{f.name}</p>
              <p className={`text-lg text-slate-900 dark:text-slate-100 ${f.cls}`}>{f.text}</p>
            </div>
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
    </div>
  );
}
