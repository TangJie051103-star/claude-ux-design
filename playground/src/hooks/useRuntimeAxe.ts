import { useEffect, useRef } from "react";

export default function useRuntimeAxe() {
  const ranRef = useRef(false);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    if (ranRef.current) return;
    ranRef.current = true;

    const timeout = setTimeout(async () => {
      const { default: axe } = await import("axe-core");
      const results = await axe.run(document);
      if (results.violations.length === 0) return;

      // 开发期运行时 a11y 检测，使用 console 是预期行为
      /* eslint-disable no-console */
      console.group(
        `%c[axe] %c${results.violations.length} 个无障碍违规`,
        "font-weight:bold;color:#e11d48",
        "color:#e11d48",
      );
      for (const v of results.violations) {
        console.groupCollapsed(
          `%c${v.id}: ${v.help} %c(${v.impact})`,
          "font-weight:bold",
          "color:#6b7280",
        );
        console.log("说明:", v.description);
        console.log("帮助:", v.helpUrl);
        console.log("受影响的节点:", v.nodes);
        console.groupEnd();
      }
      console.groupEnd();
      /* eslint-enable no-console */
    }, 500);

    return () => clearTimeout(timeout);
  }, []);
}
