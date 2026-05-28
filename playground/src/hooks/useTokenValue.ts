import { useMemo } from "react";

export default function useTokenValue(tokenName: string): string {
  return useMemo(() => {
    if (typeof document === "undefined") return "";
    return getComputedStyle(document.body).getPropertyValue(tokenName).trim();
  }, [tokenName]);
}
