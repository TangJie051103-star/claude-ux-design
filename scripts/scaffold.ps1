# 组件骨架生成脚本
# 用法: .\scripts\scaffold.ps1 -ComponentName "Card" -Type "ui"

param(
    [Parameter(Mandatory=$true)]
    [string]$ComponentName,

    [Parameter(Mandatory=$false)]
    [ValidateSet("ui", "layout", "features", "shared")]
    [string]$Type = "ui"
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Playground = Resolve-Path (Join-Path $ScriptDir "..\playground")
$ComponentDir = Join-Path $Playground "src\components\$Type"
$TestDir = Join-Path $Playground "src\__tests__"

# Validate component directory exists
if (-not (Test-Path $ComponentDir)) {
    Write-Host "Error: Component directory not found: src\components\$Type" -ForegroundColor Red
    Write-Host "Run create-project.ps1 first, or create the directory manually." -ForegroundColor Red
    exit 1
}

# Check for existing component
$TsxPath = Join-Path $ComponentDir "$ComponentName.tsx"
$TestPath = Join-Path $TestDir "$ComponentName.test.tsx"

if (Test-Path $TsxPath) {
    Write-Host "Error: $TsxPath already exists" -ForegroundColor Red
    exit 1
}
if (Test-Path $TestPath) {
    Write-Host "Error: $TestPath already exists" -ForegroundColor Red
    exit 1
}

Write-Host "Scaffolding component: $ComponentName (type: $Type)" -ForegroundColor Cyan

# ── Generate .tsx based on type ──
switch ($Type) {
    "ui" {
        $componentCode = @"
import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ${ComponentName}Variants = cva(
  "",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        md: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

interface ${ComponentName}Props
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${ComponentName}Variants> {}

const $ComponentName = forwardRef<HTMLDivElement, ${ComponentName}Props>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(${ComponentName}Variants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

$ComponentName.displayName = "$ComponentName";

export { ${ComponentName}Variants };
export default $ComponentName;
"@
    }

    "layout" {
        $componentCode = @"
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ${ComponentName}Props {
  children: ReactNode;
  className?: string;
}

export default function $ComponentName({ children, className }: ${ComponentName}Props) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
"@
    }

    "features" {
        $componentCode = @"
import { cn } from "@/lib/utils";

interface ${ComponentName}Props {
  className?: string;
}

export default function $ComponentName({ className }: ${ComponentName}Props) {
  return (
    <div className={cn("", className)} data-testid="$ComponentName">
      $ComponentName
    </div>
  );
}
"@
    }

    "shared" {
        $componentCode = @"
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ${ComponentName}Props {
  children: ReactNode;
  className?: string;
}

export default function $ComponentName({ children, className }: ${ComponentName}Props) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
"@
    }
}

# ── Generate .test.tsx ──
if ($Type -eq "features") {
    $testCode = @"
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import $ComponentName from "@/components/$Type/$ComponentName";

describe("$ComponentName", () => {
  it("renders without crashing", () => {
    render(<$ComponentName />);
    expect(screen.getByTestId("$ComponentName")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(<$ComponentName className="test-class" />);
    expect(screen.getByTestId("$ComponentName")).toHaveClass("test-class");
  });

  it("无障碍：无 a11y violations", async () => {
    const { container } = render(<$ComponentName />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
"@
} else {
    $testCode = @"
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import $ComponentName from "@/components/$Type/$ComponentName";

describe("$ComponentName", () => {
  it("renders without crashing", () => {
    render(<${ComponentName}>$ComponentName</${ComponentName}>);
    expect(screen.getByText("$ComponentName")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(<${ComponentName} className="test-class">$ComponentName</${ComponentName}>);
    expect(screen.getByText("$ComponentName")).toHaveClass("test-class");
  });

  it("无障碍：无 a11y violations", async () => {
    const { container } = render(<${ComponentName}>$ComponentName</${ComponentName}>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
"@
}

# ── Write files ──
Set-Content -Path $TsxPath -Value $componentCode -Encoding UTF8
Set-Content -Path $TestPath -Value $testCode -Encoding UTF8

Write-Host "  Created: $TsxPath" -ForegroundColor Green
Write-Host "  Created: $TestPath" -ForegroundColor Green
Write-Host "Done. Next steps:" -ForegroundColor Cyan
Write-Host "  1. Fill in component logic and styles" -ForegroundColor White
Write-Host "  2. Add meaningful tests" -ForegroundColor White
Write-Host "  3. Run: npm run check && npm run test" -ForegroundColor White
