import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { FoodLog, DailyTotals } from '@/types'

export function useFoodLog(userId: string | undefined, date: string) {
  const [logs, setLogs] = useState<FoodLog[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLogs = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    const { data } = await supabase
      .from('food_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('logged_at', date)
      .order('created_at', { ascending: true })
    setLogs((data as FoodLog[]) ?? [])
    setLoading(false)
  }, [userId, date])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  async function addLog(entry: {
    food_id: string
    food_name: string
    serving_label: string
    quantity: number
    calories: number
    protein: number
    carbs: number
    fat: number
  }) {
    if (!userId) return
    const { data, error } = await supabase
      .from('food_logs')
      .insert({ user_id: userId, logged_at: date, ...entry })
      .select()
      .single()
    if (error) throw error
    setLogs(prev => [...prev, data as FoodLog])
    return data as FoodLog
  }

  async function deleteLog(logId: string) {
    const { error } = await supabase.from('food_logs').delete().eq('id', logId)
    if (error) throw error
    setLogs(prev => prev.filter(l => l.id !== logId))
  }

  const totals: DailyTotals = logs.reduce(
    (acc, log) => ({
      calories: acc.calories + log.calories,
      protein: acc.protein + log.protein,
      carbs: acc.carbs + log.carbs,
      fat: acc.fat + log.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  )

  return { logs, loading, totals, addLog, deleteLog, refetch: fetchLogs }
}
