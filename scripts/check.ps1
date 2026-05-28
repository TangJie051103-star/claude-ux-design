# Root-level quality check script
# Usage: .\scripts\check.ps1

$ErrorActionPreference = "Continue"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Playground = Resolve-Path (Join-Path $ScriptDir "..\playground")

function Write-Pass {
  Write-Host "  [PASS] " -NoNewline -ForegroundColor Green
  Write-Host $args[0]
}

function Write-Fail {
  Write-Host "  [FAIL] " -NoNewline -ForegroundColor Red
  Write-Host $args[0]
}

$failed = 0

Write-Host "===== Quality Check Start (playground) =====" -ForegroundColor Cyan

try {
  Push-Location $Playground

  # 1. TypeScript compilation
  Write-Host "[1/4] TypeScript compilation..." -ForegroundColor Yellow
  npx tsc -b 2>&1 | Out-Null
  if ($LASTEXITCODE -eq 0) {
    Write-Pass "tsc: zero errors"
  } else {
    Write-Fail "tsc: errors found"
    npx tsc -b 2>&1 | Write-Host
    $failed++
  }

  # 2. ESLint
  Write-Host "[2/4] ESLint..." -ForegroundColor Yellow
  npx eslint . 2>&1 | Out-Null
  if ($LASTEXITCODE -eq 0) {
    Write-Pass "eslint: zero warnings"
  } else {
    Write-Fail "eslint: issues found"
    npx eslint . 2>&1 | Write-Host
    $failed++
  }

  # 3. Vitest
  Write-Host "[3/4] Vitest..." -ForegroundColor Yellow
  npx vitest run 2>&1 | Out-Null
  if ($LASTEXITCODE -eq 0) {
    Write-Pass "vitest: all tests passed"
  } else {
    Write-Fail "vitest: tests failed"
    npx vitest run 2>&1 | Write-Host
    $failed++
  }

  # 4. Playwright E2E
  Write-Host "[4/4] Playwright..." -ForegroundColor Yellow
  npx playwright test 2>&1 | Out-Null
  if ($LASTEXITCODE -eq 0) {
    Write-Pass "playwright: e2e passed"
  } else {
    Write-Fail "playwright: e2e failed"
    npx playwright test 2>&1 | Write-Host
    $failed++
  }
} finally {
  Pop-Location
}

Write-Host ""
if ($failed -eq 0) {
  Write-Host "===== All checks passed =====" -ForegroundColor Green
} else {
  Write-Host "===== $failed check(s) failed =====" -ForegroundColor Red
}

exit $failed
