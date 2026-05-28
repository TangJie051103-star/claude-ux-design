# Vite + React + Tailwind CSS + shadcn/ui 项目模板脚本
# 用法: .\scripts\create-project.ps1 -ProjectName "my-app"

param(
    [Parameter(Mandatory=$true)]
    [string]$ProjectName
)

$ErrorActionPreference = "Stop"
Write-Host "=== Creating project: $ProjectName ===" -ForegroundColor Cyan

# 1. Create Vite + React + TypeScript project
Write-Host "`n[1/9] Creating Vite project..." -ForegroundColor Yellow
npm create vite@latest $ProjectName -- --template react-ts
Set-Location $ProjectName

# 2. Install base dependencies
Write-Host "`n[2/9] Installing base dependencies..." -ForegroundColor Yellow
npm install

# 3. Install Tailwind CSS
Write-Host "`n[3/9] Installing Tailwind CSS..." -ForegroundColor Yellow
npm install -D tailwindcss @tailwindcss/vite

# 4. Install shadcn/ui dependencies
Write-Host "`n[4/9] Installing shadcn/ui + common deps..." -ForegroundColor Yellow
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react

# 5. Install ESLint + Prettier
Write-Host "`n[5/9] Installing ESLint + Prettier..." -ForegroundColor Yellow
npm install -D prettier eslint-config-prettier
npm install -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh
npm install -D @types/node

# 6. Install Vitest + React Testing Library
Write-Host "`n[6/9] Installing Vitest + Testing Library..." -ForegroundColor Yellow
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom vitest-axe

# 7. Write config files
Write-Host "`n[7/9] Writing config files..." -ForegroundColor Yellow

# Vite config (with @/ path alias)
$viteConfig = @'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
'@
Set-Content -Path "vite.config.ts" -Value $viteConfig -Encoding UTF8

# Vitest config
$vitestConfig = @'
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    css: true,
  },
});
'@
Set-Content -Path "vitest.config.ts" -Value $vitestConfig -Encoding UTF8

# Tailwind CSS entry
$tailwindCss = @'
@import "tailwindcss";
'@
Set-Content -Path "src/index.css" -Value $tailwindCss -Encoding UTF8

# ESLint config (flat config)
$eslintConfig = @'
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
);
'@
Set-Content -Path "eslint.config.js" -Value $eslintConfig -Encoding UTF8

# Prettier config
$prettierConfig = @'
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100
}
'@
Set-Content -Path ".prettierrc" -Value $prettierConfig -Encoding UTF8

# tsconfig.json (with @/ path alias)
$tsconfig = @'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "esModuleInterop": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
'@
Set-Content -Path "tsconfig.json" -Value $tsconfig -Encoding UTF8

# components.json (shadcn/ui config)
$componentsConfig = @'
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
'@
Set-Content -Path "components.json" -Value $componentsConfig -Encoding UTF8

# .nvmrc
Set-Content -Path ".nvmrc" -Value "24" -Encoding UTF8

# src/lib/utils.ts (shadcn/ui cn utility)
New-Item -ItemType Directory -Force -Path "src/lib" | Out-Null
$cnUtil = @'
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
'@
Set-Content -Path "src/lib/utils.ts" -Value $cnUtil -Encoding UTF8

# Test setup file
New-Item -ItemType Directory -Force -Path "src/__tests__" | Out-Null
$testSetup = @'
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

HTMLCanvasElement.prototype.getContext = () => null;
HTMLCanvasElement.prototype.toDataURL = () => "";
HTMLCanvasElement.prototype.toBlob = () => {};

afterEach(() => {
  cleanup();
});
'@
Set-Content -Path "src/test-setup.ts" -Value $testSetup -Encoding UTF8

# 8. Create component directories and example files
Write-Host "`n[8/9] Creating component structure and examples..." -ForegroundColor Yellow

$dirs = @(
    "src/components/ui",
    "src/components/layout",
    "src/components/features",
    "src/components/shared"
)
foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

# ErrorBoundary example
$errorBoundary = @'
import { Component, type ReactNode } from "react";
import Button from "@/components/ui/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          className="flex flex-col items-center justify-center gap-4 rounded-xl border border-red-200 bg-red-50 p-8 text-center"
        >
          <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
          <p className="text-sm text-red-600">
            {this.state.error?.message ?? "Unknown error"}
          </p>
          <Button intent="danger" size="sm" onClick={this.handleReset}>
            Retry
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
'@
Set-Content -Path "src/components/ui/ErrorBoundary.tsx" -Value $errorBoundary -Encoding UTF8

# Button component example
$button = @'
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      intent: {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        outline: "border border-slate-300 bg-transparent hover:bg-slate-50",
        danger: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ intent, size, className }))}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

// eslint-disable-next-line react-refresh/only-export-components -- cva pattern: export variants for external reuse
export { buttonVariants };
export default Button;
'@
Set-Content -Path "src/components/ui/Button.tsx" -Value $button -Encoding UTF8

# Button test example
$buttonTest = @'
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import Button from "@/components/ui/Button";

describe("Button", () => {
  it("renders with default intent", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Submit</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire click when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Button>Accessible</Button>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
'@
Set-Content -Path "src/__tests__/Button.test.tsx" -Value $buttonTest -Encoding UTF8

# 9. Update npm scripts
Write-Host "`n[9/9] Updating npm scripts..." -ForegroundColor Yellow

$packageJson = Get-Content "package.json" -Encoding UTF8 | ConvertFrom-Json
$packageJson.scripts | Add-Member -NotePropertyName "format" -NotePropertyValue "prettier --write ." -Force
$packageJson.scripts | Add-Member -NotePropertyName "format:check" -NotePropertyValue "prettier --check ." -Force
$packageJson.scripts | Add-Member -NotePropertyName "lint" -NotePropertyValue "eslint ." -Force
$packageJson.scripts | Add-Member -NotePropertyName "lint:fix" -NotePropertyValue "eslint . --fix" -Force
$packageJson.scripts | Add-Member -NotePropertyName "check" -NotePropertyValue "tsc -b && eslint ." -Force
$packageJson.scripts | Add-Member -NotePropertyName "test" -NotePropertyValue "vitest run" -Force
$packageJson.scripts | Add-Member -NotePropertyName "test:watch" -NotePropertyValue "vitest" -Force
$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json" -Encoding UTF8

# Append to .gitignore
Add-Content -Path ".gitignore" -Value "`n# IDE`n.vscode/`n.idea/`n*.swp`n*.swo"

Write-Host "`n=== Project created! ===" -ForegroundColor Green
Write-Host "  cd $ProjectName" -ForegroundColor White
Write-Host "  npm run dev         # Start dev server" -ForegroundColor White
Write-Host "  npm run format      # Format code" -ForegroundColor White
Write-Host "  npm run check       # TypeScript + ESLint check" -ForegroundColor White
Write-Host "  npm run test        # Run tests" -ForegroundColor White
Write-Host "  npx shadcn@latest add button  # Add shadcn components" -ForegroundColor White
