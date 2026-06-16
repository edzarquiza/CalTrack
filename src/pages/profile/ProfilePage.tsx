import { useState } from 'react'
import { LogOut, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import type { ActivityLevel, GoalType } from '@/types'

export function ProfilePage() {
  const { profile, signOut, updateProfile } = useApp()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    age: String(profile?.age ?? ''),
    height_cm: String(profile?.height_cm ?? ''),
    current_weight_kg: String(profile?.current_weight_kg ?? ''),
    target_weight_kg: String(profile?.target_weight_kg ?? ''),
    activity_level: profile?.activity_level ?? 'moderately_active',
    goal_type: profile?.goal_type ?? 'maintain',
    maintenance_calories: String(profile?.maintenance_calories ?? ''),
    daily_calorie_goal: String(profile?.daily_calorie_goal ?? ''),
    protein_goal: String(profile?.protein_goal ?? ''),
    carb_goal: String(profile?.carb_goal ?? ''),
    fat_goal: String(profile?.fat_goal ?? ''),
  })

  if (!profile) return null

  const p = profile

  function openEdit() {
    setForm({
      age: String(p.age ?? ''),
      height_cm: String(p.height_cm ?? ''),
      current_weight_kg: String(p.current_weight_kg ?? ''),
      target_weight_kg: String(p.target_weight_kg ?? ''),
      activity_level: p.activity_level ?? 'moderately_active',
      goal_type: p.goal_type ?? 'maintain',
      maintenance_calories: String(p.maintenance_calories ?? ''),
      daily_calorie_goal: String(p.daily_calorie_goal ?? ''),
      protein_goal: String(p.protein_goal ?? ''),
      carb_goal: String(p.carb_goal ?? ''),
      fat_goal: String(p.fat_goal ?? ''),
    })
    setEditing(true)
  }

  const bmi = p.height_cm && p.current_weight_kg
    ? calculateBMI(p.current_weight_kg, p.height_cm)
    : null

  function recalculate() {
    const w = parseFloat(form.current_weight_kg)
    const h = parseFloat(form.height_cm)
    const a = parseInt(form.age)
    if (!w || !h || !a || !p.sex) return
    const tdee = calculateTDEE(w, h, a, p.sex, form.activity_level)
    let cal = calculateCalorieGoal(tdee, form.goal_type)
    const tw = parseFloat(form.target_weight_kg)
    if (tw && tw !== w) {
      const diff = w - tw
      if (form.goal_type === 'lose' && diff > 0) {
        const weeklyLoss = Math.min(diff / 12, 1)
        const dailyDeficit = Math.round((weeklyLoss * 7700) / 7)
        cal = Math.max(1200, tdee - dailyDeficit)
      } else if (form.goal_type === 'gain' && diff < 0) {
        const weeklyGain = Math.min(-diff / 12, 0.5)
        const dailySurplus = Math.round((weeklyGain * 7700) / 7)
        cal = tdee + dailySurplus
      }
    }
    const macros = calculateMacros(cal)
    setForm(f => ({
      ...f,
      maintenance_calories: String(tdee),
      daily_calorie_goal: String(cal),
      protein_goal: String(macros.protein),
      carb_goal: String(macros.carbs),
      fat_goal: String(macros.fat),
    }))
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      await updateProfile({
        age: parseInt(form.age) || p.age,
        height_cm: parseFloat(form.height_cm) || p.height_cm,
        current_weight_kg: parseFloat(form.current_weight_kg) || p.current_weight_kg,
        target_weight_kg: parseFloat(form.target_weight_kg) || p.target_weight_kg,
        activity_level: form.activity_level,
        goal_type: form.goal_type,
        maintenance_calories: parseInt(form.maintenance_calories) || p.maintenance_calories,
        daily_calorie_goal: parseInt(form.daily_calorie_goal) || p.daily_calorie_goal,
        protein_goal: parseInt(form.protein_goal) || p.protein_goal,
        carb_goal: parseInt(form.carb_goal) || p.carb_goal,
        fat_goal: parseInt(form.fat_goal) || p.fat_goal,
      })
      setEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  async function handleSignOut() {
    try {
      await signOut()
      navigate('/login')
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-lg mx-auto px-4 py-5 space-y-4">
      {/* User info */}
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
          {profile.username[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold">@{profile.username}</h1>
          <p className="text-sm text-muted-foreground">{profile.email ?? 'No email set'}</p>
        </div>
      </div>

      {/* BMI */}
      {bmi && (
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <div className="text-sm text-muted-foreground">BMI</div>
              <div className="text-3xl font-bold">{bmi.toFixed(1)}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">{getBMICategory(bmi)}</div>
              <div className="text-xs text-muted-foreground">
                {profile.current_weight_kg} kg · {profile.height_cm} cm
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calorie reference — always visible, uses live form values during editing */}
      {(() => {
        const w = editing ? parseFloat(form.current_weight_kg) : p.current_weight_kg
        const h = editing ? parseFloat(form.height_cm) : p.height_cm
        const a = editing ? parseInt(form.age) : p.age
        const activity = editing ? form.activity_level : p.activity_level
        const goalType = editing ? form.goal_type : p.goal_type
        const dailyCal = editing ? parseInt(form.daily_calorie_goal) : p.daily_calorie_goal
        if (!w || !h || !a || !p.sex) return null
        const tdee = calculateTDEE(w, h, a, p.sex, activity)
        const goalDesc = goalType === 'lose' ? 'Personalized cut' : goalType === 'gain' ? 'Personalized gain' : 'Set target'
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Calorie Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3">
                {editing ? 'Preview · ' : ''}TDEE {tdee.toLocaleString()} kcal · Maintenance and Surplus update when you change weight or activity
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Maintenance', desc: 'Stay the same', value: tdee, active: goalType === 'maintain' },
                  { label: 'Cutting', desc: '−500 kcal deficit', value: Math.max(1200, tdee - 500), active: goalType === 'lose' },
                  { label: 'Surplus', desc: '+300 kcal surplus', value: tdee + 300, active: goalType === 'gain' },
                  { label: 'Your Goal', desc: goalDesc, value: dailyCal, active: true, highlight: true },
                ].map(({ label, desc, value, active, highlight }) => (
                  <div
                    key={label}
                    className={`rounded-lg p-3 border ${highlight ? 'border-primary bg-primary/5' : active ? 'border-primary/30 bg-primary/5' : 'border-transparent bg-muted/50'}`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="text-xs font-medium">{label}</div>
                      {(active || highlight) && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </div>
                    <div className="text-lg font-bold">{value?.toLocaleString() ?? '—'}</div>
                    <div className="text-xs text-muted-foreground">{desc}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })()}

      {/* Goals summary */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Daily Goals</CardTitle>
            {!editing && (
              <button
                className="text-xs text-primary font-medium"
                onClick={openEdit}
              >
                Edit
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!editing ? (
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Calories', value: `${profile.daily_calorie_goal} kcal` },
                { label: 'Protein', value: `${profile.protein_goal}g` },
                { label: 'Carbs', value: `${profile.carb_goal}g` },
                { label: 'Fat', value: `${profile.fat_goal}g` },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg bg-muted/50 p-3">
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="font-semibold">{value}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Age</Label>
                  <Input
                    type="number"
                    value={form.age}
                    onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Height (cm)</Label>
                  <Input
                    type="number"
                    value={form.height_cm}
                    onChange={e => setForm(f => ({ ...f, height_cm: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Weight (kg)</Label>
                  <Input
                    type="number"
                    value={form.current_weight_kg}
                    onChange={e => setForm(f => ({ ...f, current_weight_kg: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Target Weight (kg)</Label>
                  <Input
                    type="number"
                    value={form.target_weight_kg}
                    onChange={e => setForm(f => ({ ...f, target_weight_kg: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Activity Level</Label>
                <Select
                  value={form.activity_level}
                  onValueChange={v => setForm(f => ({ ...f, activity_level: v as ActivityLevel }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { value: 'sedentary', label: 'Sedentary' },
                      { value: 'lightly_active', label: 'Lightly Active' },
                      { value: 'moderately_active', label: 'Moderately Active' },
                      { value: 'very_active', label: 'Very Active' },
                      { value: 'extra_active', label: 'Extra Active' },
                    ].map(o => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Goal</Label>
                <Select
                  value={form.goal_type}
                  onValueChange={v => setForm(f => ({ ...f, goal_type: v as GoalType }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">Lose Weight</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="gain">Gain Weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" size="sm" className="w-full" onClick={recalculate}>
                Recalculate Targets
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-xs">Daily Calorie Goal</Label>
                  <Input
                    type="number"
                    value={form.daily_calorie_goal}
                    onChange={e => setForm(f => ({ ...f, daily_calorie_goal: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-blue-600">Protein (g)</Label>
                  <Input
                    type="number"
                    value={form.protein_goal}
                    onChange={e => setForm(f => ({ ...f, protein_goal: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-orange-500">Carbs (g)</Label>
                  <Input
                    type="number"
                    value={form.carb_goal}
                    onChange={e => setForm(f => ({ ...f, carb_goal: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-yellow-500">Fat (g)</Label>
                  <Input
                    type="number"
                    value={form.fat_goal}
                    onChange={e => setForm(f => ({ ...f, fat_goal: e.target.value }))}
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* My Foods link */}
      <button
        onClick={() => navigate('/food/custom')}
        className="w-full flex items-center justify-between rounded-xl border bg-card p-4 hover:bg-accent/50 transition-colors"
      >
        <span className="font-medium text-sm">My Custom Foods</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </button>

      {/* Sign out */}
      <Button
        variant="outline"
        className="w-full gap-2 text-destructive hover:text-destructive hover:border-destructive"
        onClick={handleSignOut}
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
  )
}
