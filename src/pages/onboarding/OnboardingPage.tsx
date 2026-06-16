import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, User, Users, TrendingDown, TrendingUp, Scale } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  calculateBMI,
  getBMICategory,
  calculateTDEE,
  calculateCalorieGoal,
  calculateMacros,
} from '@/lib/calculations'
import { cn } from '@/lib/utils'
import type { ActivityLevel, GoalType } from '@/types'

type Sex = 'male' | 'female'

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string; desc: string }[] = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
  { value: 'lightly_active', label: 'Lightly Active', desc: '1–3 days/week' },
  { value: 'moderately_active', label: 'Moderately Active', desc: '3–5 days/week' },
  { value: 'very_active', label: 'Very Active', desc: '6–7 days/week' },
  { value: 'extra_active', label: 'Extra Active', desc: 'Physical job or 2x/day' },
]

export function OnboardingPage() {
  const { updateProfile } = useApp()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [sex, setSex] = useState<Sex | null>(null)
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState<ActivityLevel | ''>('')
  const [goalType, setGoalType] = useState<GoalType | ''>('')
  const [targetWeight, setTargetWeight] = useState('')
  const [calorieGoal, setCalorieGoal] = useState('')
  const [proteinGoal, setProteinGoal] = useState('')
  const [carbGoal, setCarbGoal] = useState('')
  const [fatGoal, setFatGoal] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const totalSteps = 4

  function computeRecommendations() {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    const a = parseInt(age)
    if (!sex || !w || !h || !a || !activity || !goalType) return null
    const tdee = calculateTDEE(w, h, a, sex, activity as ActivityLevel)
    const goal = calculateCalorieGoal(tdee, goalType as GoalType)
    const macros = calculateMacros(goal)
    const bmi = calculateBMI(w, h)
    return { tdee, calorieGoal: goal, macros, bmi }
  }

  function goToStep4() {
    const recs = computeRecommendations()
    if (recs) {
      let cal = recs.calorieGoal
      const tw = parseFloat(targetWeight)
      const cw = parseFloat(weight)
      if (tw && cw && tw !== cw) {
        const diff = cw - tw // positive = need to lose, negative = need to gain
        if (goalType === 'lose' && diff > 0) {
          // 1 kg of fat ≈ 7700 kcal; spread over 12 weeks, cap at 1 kg/week loss
          const weeklyLoss = Math.min(diff / 12, 1)
          const dailyDeficit = Math.round((weeklyLoss * 7700) / 7)
          cal = Math.max(1200, recs.tdee - dailyDeficit)
        } else if (goalType === 'gain' && diff < 0) {
          // Cap at 0.5 kg/week gain to limit excess fat
          const weeklyGain = Math.min(-diff / 12, 0.5)
          const dailySurplus = Math.round((weeklyGain * 7700) / 7)
          cal = recs.tdee + dailySurplus
        }
      }
      const macros = calculateMacros(cal)
      setCalorieGoal(String(cal))
      setProteinGoal(String(macros.protein))
      setCarbGoal(String(macros.carbs))
      setFatGoal(String(macros.fat))
    }
    setStep(4)
  }

  async function handleFinish() {
    const recs = computeRecommendations()
    if (!recs || !sex || !activity || !goalType) return
    setSaving(true)
    setError('')
    try {
      await updateProfile({
        sex,
        age: parseInt(age),
        height_cm: parseFloat(height),
        current_weight_kg: parseFloat(weight),
        target_weight_kg: parseFloat(targetWeight) || parseFloat(weight),
        activity_level: activity as ActivityLevel,
        goal_type: goalType as GoalType,
        maintenance_calories: recs.tdee,
        daily_calorie_goal: parseInt(calorieGoal),
        protein_goal: parseInt(proteinGoal),
        carb_goal: parseInt(carbGoal),
        fat_goal: parseInt(fatGoal),
      })
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const recs = step === 4 ? computeRecommendations() : null

  return (
    <div className="flex min-h-screen flex-col px-4 py-6 bg-background max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        {step > 1 && (
          <button
            onClick={() => setStep(s => s - 1)}
            className="p-1 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <div className="flex-1">
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-colors',
                  i < step ? 'bg-primary' : 'bg-muted',
                )}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Step {step} of {totalSteps}</p>
        </div>
      </div>

      {/* Step 1: Sex */}
      {step === 1 && (
        <div className="space-y-6 flex-1">
          <div>
            <h2 className="text-2xl font-bold">What's your sex?</h2>
            <p className="text-muted-foreground mt-1">Used for accurate calorie calculations</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(['male', 'female'] as Sex[]).map(s => (
              <button
                key={s}
                onClick={() => setSex(s)}
                className={cn(
                  'rounded-2xl border-2 p-8 text-center transition-all',
                  sex === s
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50',
                )}
              >
                {s === 'male'
                  ? <User className="h-10 w-10 mb-2 mx-auto text-blue-500" />
                  : <Users className="h-10 w-10 mb-2 mx-auto text-pink-500" />
                }
                <div className="font-semibold capitalize">{s}</div>
              </button>
            ))}
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={() => setStep(2)}
            disabled={!sex}
          >
            Continue
          </Button>
        </div>
      )}

      {/* Step 2: Stats */}
      {step === 2 && (
        <div className="space-y-6 flex-1">
          <div>
            <h2 className="text-2xl font-bold">Your body stats</h2>
            <p className="text-muted-foreground mt-1">Used to calculate your daily needs</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                inputMode="numeric"
                placeholder="25"
                value={age}
                onChange={e => setAge(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                inputMode="decimal"
                placeholder="170"
                value={height}
                onChange={e => setHeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Current Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                inputMode="decimal"
                placeholder="70"
                value={weight}
                onChange={e => setWeight(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={() => setStep(3)}
            disabled={!age || !height || !weight}
          >
            Continue
          </Button>
        </div>
      )}

      {/* Step 3: Goals */}
      {step === 3 && (
        <div className="space-y-6 flex-1">
          <div>
            <h2 className="text-2xl font-bold">Your goals</h2>
            <p className="text-muted-foreground mt-1">We'll calculate your targets</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={activity} onValueChange={v => setActivity(v as ActivityLevel)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  {ACTIVITY_OPTIONS.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label} — {opt.desc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Goal</Label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { value: 'lose', label: 'Lose', Icon: TrendingDown },
                  { value: 'maintain', label: 'Maintain', Icon: Scale },
                  { value: 'gain', label: 'Gain', Icon: TrendingUp },
                ] as const).map(g => (
                  <button
                    key={g.value}
                    onClick={() => setGoalType(g.value)}
                    className={cn(
                      'rounded-xl border-2 p-3 text-center transition-all',
                      goalType === g.value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:border-primary/50',
                    )}
                  >
                    <g.Icon className="h-6 w-6 mx-auto mb-1" />
                    <div className="text-xs font-semibold">{g.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetWeight">
                Target Weight (kg)
                <span className="text-muted-foreground font-normal ml-1">(optional)</span>
              </Label>
              <Input
                id="targetWeight"
                type="number"
                inputMode="decimal"
                placeholder={weight || '65'}
                value={targetWeight}
                onChange={e => setTargetWeight(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={goToStep4}
            disabled={!activity || !goalType}
          >
            Calculate My Goals
          </Button>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && recs && (
        <div className="space-y-6 flex-1">
          <div>
            <h2 className="text-2xl font-bold">Your personalized plan</h2>
            <p className="text-muted-foreground mt-1">Review and adjust if needed</p>
          </div>

          {/* BMI */}
          <div className="rounded-xl bg-muted/50 p-4 flex justify-between items-center">
            <div>
              <div className="text-sm text-muted-foreground">BMI</div>
              <div className="text-2xl font-bold">{recs.bmi.toFixed(1)}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{getBMICategory(recs.bmi)}</div>
              <div className="text-xs text-muted-foreground">Body Mass Index</div>
            </div>
          </div>

          {/* Maintenance */}
          <div className="rounded-xl bg-muted/50 p-4 text-center">
            <div className="text-sm text-muted-foreground">Maintenance Calories (TDEE)</div>
            <div className="text-3xl font-bold">{recs.tdee.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">kcal/day</div>
          </div>

          {/* Editable goals */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Daily Calorie Goal</Label>
            <Input
              type="number"
              inputMode="numeric"
              value={calorieGoal}
              onChange={e => setCalorieGoal(e.target.value)}
              className="text-lg font-bold text-center"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-xs text-blue-600">Protein (g)</Label>
              <Input
                type="number"
                inputMode="numeric"
                value={proteinGoal}
                onChange={e => setProteinGoal(e.target.value)}
                className="text-center"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-orange-500">Carbs (g)</Label>
              <Input
                type="number"
                inputMode="numeric"
                value={carbGoal}
                onChange={e => setCarbGoal(e.target.value)}
                className="text-center"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-yellow-500">Fat (g)</Label>
              <Input
                type="number"
                inputMode="numeric"
                value={fatGoal}
                onChange={e => setFatGoal(e.target.value)}
                className="text-center"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            className="w-full"
            size="lg"
            onClick={handleFinish}
            disabled={saving}
          >
            {saving ? 'Saving...' : "Let's Start Tracking!"}
          </Button>
        </div>
      )}
    </div>
  )
}
