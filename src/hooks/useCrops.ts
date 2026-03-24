import { useState, useEffect, useCallback } from "react";
import { cropApi } from "../services/api";
import type { Crop } from "../types";

interface UseCropsReturn {
  crops: Crop[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export default function useCrops(): UseCropsReturn {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchCrops = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await cropApi.getAll();
      setCrops(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unable to load crops.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void fetchCrops();
  }, [fetchCrops]);

  return { crops, loading, error, refresh: fetchCrops };
}
