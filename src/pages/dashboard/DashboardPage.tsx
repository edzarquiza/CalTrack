import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Plus, Trash2, ChevronLeft, ChevronRight, UtensilsCrossed, Scale } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useFoodLog } from '@/hooks/useFoodLog'
import { useWeightLog } from '@/hooks/useWeightLog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { today, localDate, formatDate, clamp } from '@/lib/utils'

export function DashboardPage() {
  const { profile } = useApp()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const date = searchParams.get('date') || today()
  const isToday = date === today()
  const { logs, totals, loading, deleteLog } = useFoodLog(profile?.id, date)
  const { latestWeight } = useWeightLog(profile?.id)
  const [deleting, setDeleting] = useState<string | null>(null)

  function prevDay() {
    const d = new Date(date + 'T00:00:00')
    d.setDate(d.getDate() - 1)
    setSearchParams({ date: localDate(d) }, { replace: true })
  }

  function nextDay() {
    if (isToday) return
    const d = new Date(date + 'T00:00:00')
    d.setDate(d.getDate() + 1)
    const next = localDate(d)
    if (next >= today()) setSearchParams({}, { replace: true })
    else setSearchParams({ date: next }, { replace: true })
  }

  if (!profile) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-muted-foreground text-sm">Loading...</div>
    </div>
  )

  const calorieGoal = profile.daily_calorie_goal || 2000
  const remaining = calorieGoal - totals.calories
  const caloriePct = clamp(Math.round((totals.calories / calorieGoal) * 100), 0, 100)
  const proteinPct = clamp(Math.round((totals.protein / (profile.protein_goal || 1)) * 100), 0, 100)
  const carbsPct = clamp(Math.round((totals.carbs / (profile.carb_goal || 1)) * 100), 0, 100)
  const fatPct = clamp(Math.round((totals.fat / (profile.fat_goal || 1)) * 100), 0, 100)

  // profile.current_weight_kg = initial onboarding weight (baseline for progress)
  const initialWeight = profile.current_weight_kg
  const currentWeight = latestWeight ?? initialWeight
  const targetWeight = profile.target_weight_kg
  const weightDiff = initialWeight - targetWeight
  const weightProgress = weightDiff === 0
    ? 100
    : clamp(Math.round(((initialWeight - currentWeight) / weightDiff) * 100), 0, 100)

  async function handleDelete(logId: string) {
    setDeleting(logId)
    try {
      await deleteLog(logId)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="px-4 py-5 space-y-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold">
          {isToday ? `Good ${getGreeting()}, ${profile.username}` : profile.username}
        </h1>
        <div className="flex items-center gap-1">
          <button
            onClick={prevDay}
            className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex-1 text-center">
            <span className="text-sm text-muted-foreground">
              {isToday ? `Today · ${formatDate(date)}` : formatDate(date)}
            </span>
          </div>
          <button
            onClick={nextDay}
            disabled={isToday}
            className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        {!isToday && (
          <button
            onClick={() => setSearchParams({}, { replace: true })}
            className="text-xs text-primary font-medium w-full text-center"
          >
            Back to today
          </button>
        )}
      </div>

      {/* Calorie Card */}
      <Card>
        <CardHeader>
          <CardTitle>Calories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end mb-3">
            <div>
              <span className="text-4xl font-bold">{Math.round(totals.calories)}</span>
              <span className="text-muted-foreground text-sm ml-1">/ {calorieGoal} kcal</span>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${remaining < 0 ? 'text-destructive' : 'text-green-600'}`}>
                {remaining < 0 ? '+' : ''}{Math.abs(Math.round(remaining))}
              </div>
              <div className="text-xs text-muted-foreground">
                {remaining < 0 ? 'over goal' : 'remaining'}
              </div>
            </div>
          </div>
          <Progress value={caloriePct} className="h-3 rounded-full" />
          <p className="text-xs text-muted-foreground mt-1.5 text-right">{caloriePct}% of goal</p>
        </CardContent>
      </Card>

      {/* Macros Card */}
      <Card>
        <CardHeader>
          <CardTitle>Macros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <MacroRow
            label="Protein"
            color="bg-blue-500"
            current={Math.round(totals.protein)}
            goal={profile.protein_goal}
            pct={proteinPct}
            unit="g"
          />
          <MacroRow
            label="Carbs"
            color="bg-orange-400"
            current={Math.round(totals.carbs)}
            goal={profile.carb_goal}
            pct={carbsPct}
            unit="g"
          />
          <MacroRow
            label="Fat"
            color="bg-yellow-400"
            current={Math.round(totals.fat)}
            goal={profile.fat_goal}
            pct={fatPct}
            unit="g"
          />
        </CardContent>
      </Card>

      {/* Weight Goal Card */}
      {targetWeight && targetWeight !== initialWeight && (
        <Card>
          <CardHeader>
            <CardTitle>Weight Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span>{currentWeight?.toFixed(1)} kg <span className="text-muted-foreground">now</span></span>
              <span className="text-muted-foreground">{weightProgress}%</span>
              <span className="text-green-600">{targetWeight} kg <span className="text-muted-foreground">goal</span></span>
            </div>
            <Progress value={weightProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1.5">
              {Math.abs(currentWeight - targetWeight).toFixed(1)} kg to go
            </p>
          </CardContent>
        </Card>
      )}

      {/* Food Log */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">{isToday ? "Today's Log" : 'Food Log'}</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/food/search?date=${date}`)}
            className="gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Food
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground text-sm">Loading...</div>
        ) : logs.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => navigate(`/food/search?date=${date}`)}
          >
            <UtensilsCrossed className="h-8 w-8 mb-2 text-muted-foreground" />
            <p className="font-medium">No food logged yet</p>
            <p className="text-sm text-muted-foreground mt-1">Tap to add your first meal</p>
          </div>
        ) : (
          <div className="space-y-2">
            {logs.map(log => (
              <div
                key={log.id}
                className="flex items-center gap-3 rounded-xl border bg-card p-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{log.food_name}</div>
                  <div className="text-xs text-muted-foreground">
                    {log.quantity} × {log.serving_label}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-semibold">{Math.round(log.calories)} kcal</div>
                  <div className="text-xs text-muted-foreground">
                    P {Math.round(log.protein)}g · C {Math.round(log.carbs)}g · F {Math.round(log.fat)}g
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(log.id)}
                  disabled={deleting === log.id}
                  className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick action to weight page */}
      <button
        onClick={() => navigate('/weight')}
        className="w-full flex items-center justify-between rounded-xl border bg-card p-4 hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Scale className="h-6 w-6 text-muted-foreground" />
          <div className="text-left">
            <div className="text-sm font-medium">Log today's weight</div>
            <div className="text-xs text-muted-foreground">
              {currentWeight ? `Current: ${currentWeight.toFixed(1)} kg` : 'Track your progress'}
            </div>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  )
}

function MacroRow({
  label,
  color,
  current,
  goal,
  pct,
  unit,
}: {
  label: string
  color: string
  current: number
  goal: number
  pct: number
  unit: string
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">
          {current}{unit} / {goal}{unit}
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  return 'evening'
}
