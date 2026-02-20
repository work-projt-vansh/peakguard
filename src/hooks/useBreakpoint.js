import { useState, useEffect } from "react";

/**
 * useBreakpoint — returns current viewport flags.
 * xs  < 480
 * sm  < 768   (mobile)
 * md  < 1024  (tablet)
 * lg >= 1024  (desktop)
 */
export function useBreakpoint() {
  const [w, setW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return {
    w,
    xs: w < 480,
    sm: w < 768,
    md: w < 1024,
    lg: w >= 1024,
  };
}
