import { useState, useEffect, useCallback } from 'react'
import { trendApi } from '../services/api'
import type { TrendPoint, TrendType } from '../types'

interface UseTrendReturn {
  data: TrendPoint[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export default function useTrend(cropId: number, type: TrendType): UseTrendReturn {
  const [data, setData] = useState<TrendPoint[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrend = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const { data: res } = await trendApi.getTrend(cropId, type)
      setData(res)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to load trend data.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [cropId, type])

  useEffect(() => {
    void fetchTrend()
  }, [fetchTrend])

  return { data, loading, error, refetch: fetchTrend }
}
