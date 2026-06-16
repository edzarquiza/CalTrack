import type { ActivityLevel, GoalType } from '@/types'

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
}

export function calculateBMI(weight_kg: number, height_cm: number): number {
  const h = height_cm / 100
  return weight_kg / (h * h)
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

export function calculateBMR(
  weight_kg: number,
  height_cm: number,
  age: number,
  sex: 'male' | 'female',
): number {
  const base = 10 * weight_kg + 6.25 * height_cm - 5 * age
  return sex === 'male' ? base + 5 : base - 161
}

export function calculateTDEE(
  weight_kg: number,
  height_cm: number,
  age: number,
  sex: 'male' | 'female',
  activity_level: ActivityLevel,
): number {
  const bmr = calculateBMR(weight_kg, height_cm, age, sex)
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activity_level])
}

export function calculateCalorieGoal(tdee: number, goal_type: GoalType): number {
  if (goal_type === 'lose') return Math.max(1200, tdee - 500)
  if (goal_type === 'gain') return tdee + 300
  return tdee
}

export function calculateMacros(calories: number): {
  protein: number
  carbs: number
  fat: number
} {
  return {
    protein: Math.round((calories * 0.3) / 4),
    carbs: Math.round((calories * 0.4) / 4),
    fat: Math.round((calories * 0.3) / 9),
  }
}
