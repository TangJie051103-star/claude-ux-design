import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { chromium } from "@playwright/test";
import { build, preview } from "vite";

const TARGET = "http://localhost:4173";
const THRESHOLDS = {
  performance: 90,
  accessibility: 90,
  fcp: 1800,
  lcp: 2500,
  tbt: 200,
};

async function run() {
  console.log("Building for production...");
  await build({ root: process.cwd() });

  console.log("Starting Vite preview server...");
  const server = await preview({ root: process.cwd() });

  console.log("Launching Chromium...");
  const chromePath = chromium.executablePath();
  let chrome;

  try {
    chrome = await chromeLauncher.launch({
      chromePath,
      chromeFlags: ["--headless=new", "--no-sandbox"],
    });

    console.log("Running Lighthouse audit...\n");
    const result = await lighthouse(
      TARGET,
      { port: chrome.port, output: "json" },
      {
        extends: "lighthouse:default",
        settings: { onlyCategories: ["performance", "accessibility"] },
      },
    );

    if (!result) {
      console.error("Lighthouse audit failed — no result returned.");
      process.exit(1);
    }

    const perf = Math.round(result.lhr.categories.performance.score * 100);
    const a11y = Math.round(result.lhr.categories.accessibility.score * 100);
    const fcp = result.lhr.audits["first-contentful-paint"].numericValue;
    const lcp = result.lhr.audits["largest-contentful-paint"].numericValue;
    const tbt = result.lhr.audits["total-blocking-time"].numericValue;

    console.log("═══════════════════════════════════");
    console.log("  Lighthouse Audit Results");
    console.log("═══════════════════════════════════");
    console.log("");

    const rows = [
      ["Performance", perf, THRESHOLDS.performance, "%"],
      ["Accessibility", a11y, THRESHOLDS.accessibility, "%"],
      ["FCP (ms)", fcp.toFixed(0), THRESHOLDS.fcp, "ms"],
      ["LCP (ms)", lcp.toFixed(0), THRESHOLDS.lcp, "ms"],
      ["TBT (ms)", tbt.toFixed(0), THRESHOLDS.tbt, "ms"],
    ];

    let failed = 0;
    for (const [label, value, threshold, unit] of rows) {
      const v = Number(value);
      const ok = unit === "%" ? v >= threshold : v <= threshold;
      const icon = ok ? "PASS" : "FAIL";
      const color = ok ? "\x1b[32m" : "\x1b[31m";
      console.log(
        `${color}  [${icon}]\x1b[0m ${label}: ${value}${unit}  (threshold: ${threshold}${unit})`,
      );
      if (!ok) failed++;
    }

    console.log("");
    if (failed > 0) {
      console.log(`\x1b[31m  ${failed} check(s) failed.\x1b[0m`);
      process.exit(1);
    } else {
      console.log("\x1b[32m  All checks passed.\x1b[0m");
    }
  } finally {
    if (chrome) await chrome.kill();
    await server.close();
  }
}

run();
