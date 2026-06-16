import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Food } from '@/types'

export function useRecentFoods(userId: string | undefined) {
  const [recentFoods, setRecentFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRecentFoods = useCallback(async () => {
    if (!userId) return
    setLoading(true)

    const { data } = await supabase
      .from('food_logs')
      .select('food_id, foods(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50)

    if (data) {
      const seen = new Set<string>()
      const unique: Food[] = []
      for (const log of data) {
        if (log.food_id && !seen.has(log.food_id) && log.foods) {
          seen.add(log.food_id)
          unique.push(log.foods as unknown as Food)
          if (unique.length >= 10) break
        }
      }
      setRecentFoods(unique)
    }
    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchRecentFoods()
  }, [fetchRecentFoods])

  return { recentFoods, loading, refetch: fetchRecentFoods }
}
