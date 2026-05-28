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

# 1. TypeScript compilation
Write-Host "[1/3] TypeScript compilation..." -ForegroundColor Yellow
Push-Location $Playground
if ($?) {
  npx tsc -b 2>&1 | Out-Null
  if ($LASTEXITCODE -eq 0) {
    Write-Pass "tsc: zero errors"
  } else {
    Write-Fail "tsc: errors found"
    npx tsc -b 2>&1 | Write-Host
    $failed++
  }
  Pop-Location
} else {
  Write-Fail "Cannot access playground directory"
  $failed++
}

# 2. ESLint
Write-Host "[2/3] ESLint..." -ForegroundColor Yellow
Push-Location $Playground
if ($?) {
  npx eslint . 2>&1 | Out-Null
  if ($LASTEXITCODE -eq 0) {
    Write-Pass "eslint: zero warnings"
  } else {
    Write-Fail "eslint: issues found"
    npx eslint . 2>&1 | Write-Host
    $failed++
  }
  Pop-Location
} else {
  Write-Fail "Cannot access playground directory"
  $failed++
}

# 3. Vitest
Write-Host "[3/3] Vitest..." -ForegroundColor Yellow
Push-Location $Playground
if ($?) {
  npx vitest run 2>&1 | Out-Null
  if ($LASTEXITCODE -eq 0) {
    Write-Pass "vitest: all tests passed"
  } else {
    Write-Fail "vitest: tests failed"
    npx vitest run 2>&1 | Write-Host
    $failed++
  }
  Pop-Location
} else {
  Write-Fail "Cannot access playground directory"
  $failed++
}

Write-Host ""
if ($failed -eq 0) {
  Write-Host "===== All checks passed =====" -ForegroundColor Green
} else {
  Write-Host "===== $failed check(s) failed =====" -ForegroundColor Red
}

exit $failed
