import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Food } from '@/types'

export function useFoods(userId: string | undefined) {
  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFoods = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    const { data } = await supabase
      .from('foods')
      .select('*')
      .or(`user_id.is.null,user_id.eq.${userId}`)
      .order('name', { ascending: true })
    setFoods((data as Food[]) ?? [])
    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  async function createFood(food: Omit<Food, 'id' | 'user_id' | 'created_at'>) {
    if (!userId) return
    const { data, error } = await supabase
      .from('foods')
      .insert({ ...food, user_id: userId })
      .select()
      .single()
    if (error) throw error
    setFoods(prev => [...prev, data as Food].sort((a, b) => a.name.localeCompare(b.name)))
    return data as Food
  }

  async function updateFood(id: string, updates: Partial<Omit<Food, 'id' | 'user_id' | 'created_at'>>) {
    const { data, error } = await supabase
      .from('foods')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    setFoods(prev => prev.map(f => (f.id === id ? (data as Food) : f)))
    return data as Food
  }

  async function deleteFood(id: string) {
    const { error } = await supabase.from('foods').delete().eq('id', id)
    if (error) throw error
    setFoods(prev => prev.filter(f => f.id !== id))
  }

  const customFoods = foods.filter(f => f.user_id === userId)

  return { foods, customFoods, loading, createFood, updateFood, deleteFood, refetch: fetchFoods }
}
