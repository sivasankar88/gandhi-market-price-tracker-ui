import { useState, useEffect, useCallback } from "react";
import { farmerApi } from "../services/api";
import type { CropPrice } from "../types";

interface UseFarmerPricesReturn {
  prices: CropPrice[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

export default function useFarmerPrices(): UseFarmerPricesReturn {
  const [prices, setPrices] = useState<CropPrice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await farmerApi.getPrices();
      setPrices(data);
      setLastUpdated(new Date());
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to load prices. Please check your connection.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPrices();
  }, [fetchPrices]);

  return { prices, loading, error, refetch: fetchPrices, lastUpdated };
}
