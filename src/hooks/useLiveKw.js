import { useState, useEffect } from "react";

/**
 * useLiveKw — simulates a WebSocket live kW reading.
 * Fluctuates between 300–720 kW every 2s.
 */
export function useLiveKw(initial = 487) {
  const [kw, setKw] = useState(initial);

  useEffect(() => {
    const t = setInterval(() => {
      setKw(v => Math.round(Math.max(300, Math.min(720, v + (Math.random() - 0.5) * 16))));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return kw;
}
