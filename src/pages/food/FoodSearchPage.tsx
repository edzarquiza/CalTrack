import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Search, Clock } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useFoodLog } from '@/hooks/useFoodLog'
import { useRecentFoods } from '@/hooks/useRecentFoods'
import { useFoods } from '@/hooks/useFoods'
import { ServingPicker } from '@/components/food/ServingPicker'
import { Input } from '@/components/ui/input'
import { today } from '@/lib/utils'
import type { Food } from '@/types'

export function FoodSearchPage() {
  const { profile } = useApp()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const date = searchParams.get('date') || today()
  const { addLog } = useFoodLog(profile?.id, date)
  const { recentFoods } = useRecentFoods(profile?.id)
  const { foods } = useFoods(profile?.id)

  const [query, setQuery] = useState('')
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [logError, setLogError] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return foods.filter(f => f.name.toLowerCase().includes(q)).slice(0, 30)
  }, [foods, query])

  const showRecent = !query.trim() && recentFoods.length > 0
  const showResults = query.trim().length > 0

  async function handleConfirm(food: Food, quantity: number) {
    setLogError('')
    try {
      await addLog({
        food_id: food.id,
        food_name: food.name,
        serving_label: food.serving_label,
        quantity,
        calories: Math.round(food.calories * quantity * 10) / 10,
        protein: Math.round(food.protein * quantity * 10) / 10,
        carbs: Math.round(food.carbs * quantity * 10) / 10,
        fat: Math.round(food.fat * quantity * 10) / 10,
      })
      navigate(-1)
    } catch (err) {
      setLogError(err instanceof Error ? err.message : 'Failed to log food. Please try again.')
      throw err
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-lg hover:bg-accent transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search foods..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-9"
            autoFocus
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Recent foods */}
        {showRecent && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Recent
            </div>
            <div className="space-y-1">
              {recentFoods.map(food => (
                <FoodRow key={food.id} food={food} onSelect={setSelectedFood} />
              ))}
            </div>
          </div>
        )}

        {/* Search results */}
        {showResults && (
          <div>
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="font-medium">No foods found</p>
                <p className="text-sm mt-1">Try a different name or add a custom food</p>
                <button
                  className="mt-4 text-primary text-sm font-medium underline-offset-4 hover:underline"
                  onClick={() => navigate('/food/custom')}
                >
                  + Create custom food
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                {filtered.map(food => (
                  <FoodRow key={food.id} food={food} onSelect={setSelectedFood} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!showRecent && !showResults && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="h-12 w-12 mb-3 text-muted-foreground" />
            <p className="font-medium">Search your food</p>
            <p className="text-sm text-muted-foreground mt-1">
              300+ foods including Filipino dishes, fast food, and more
            </p>
          </div>
        )}
      </div>

      {logError && (
        <div className="px-4 pb-2">
          <p className="text-sm text-destructive">{logError}</p>
        </div>
      )}

      <ServingPicker
        food={selectedFood}
        open={selectedFood !== null}
        onClose={() => { setSelectedFood(null); setLogError('') }}
        onConfirm={handleConfirm}
      />
    </div>
  )
}

function FoodRow({ food, onSelect }: { food: Food; onSelect: (f: Food) => void }) {
  return (
    <button
      className="w-full flex items-center justify-between rounded-xl px-3 py-3 hover:bg-accent/50 active:bg-accent transition-colors text-left"
      onClick={() => onSelect(food)}
    >
      <div className="min-w-0 flex-1">
        <div className="font-medium text-sm truncate">{food.name}</div>
        <div className="text-xs text-muted-foreground">{food.serving_label}</div>
      </div>
      <div className="text-right shrink-0 ml-3">
        <div className="text-sm font-semibold">{food.calories} kcal</div>
        <div className="text-xs text-muted-foreground">
          P{food.protein}g · C{food.carbs}g · F{food.fat}g
        </div>
      </div>
    </button>
  )
}
