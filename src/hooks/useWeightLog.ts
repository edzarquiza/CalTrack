import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { WeightLog } from '@/types'

export function useWeightLog(userId: string | undefined) {
  const [logs, setLogs] = useState<WeightLog[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLogs = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    const { data } = await supabase
      .from('weight_logs')
      .select('*')
      .eq('user_id', userId)
      .order('logged_at', { ascending: false })
      .limit(60)
    setLogs((data as WeightLog[]) ?? [])
    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  async function addLog(weight_kg: number, date: string) {
    if (!userId) return
    const { error } = await supabase
      .from('weight_logs')
      .upsert({ user_id: userId, weight_kg, logged_at: date }, { onConflict: 'user_id,logged_at' })
    if (error) throw error
    await fetchLogs()
  }

  async function deleteLog(logId: string) {
    const { error } = await supabase.from('weight_logs').delete().eq('id', logId)
    if (error) throw error
    setLogs(prev => prev.filter(l => l.id !== logId))
  }

  const latestWeight = logs[0]?.weight_kg ?? null

  return { logs, loading, latestWeight, addLog, deleteLog, refetch: fetchLogs }
}
