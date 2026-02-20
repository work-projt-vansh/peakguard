import { useState, useEffect } from "react";

/**
 * useLiveKw — fetches real-time kW readings and history from the Flask backend.
 * Polls the backend every 3s to stay updated.
 */
export function useLiveKw() {
  const [kw, setKw] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [liveRes, historyRes] = await Promise.all([
          fetch("/api/live-data"),
          fetch("/api/history")
        ]);

        if (!liveRes.ok || !historyRes.ok) {
          throw new Error("Failed to fetch data from the server.");
        }

        const liveData = await liveRes.json();
        const historyData = await historyRes.json();

        setKw(liveData.load_kw);
        setHistory(historyData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling interval every 3s
    const t = setInterval(fetchData, 3000);

    return () => clearInterval(t);
  }, []);

  return { kw, history, loading, error };
}