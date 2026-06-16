export type ActivityLevel =
  | 'sedentary'
  | 'lightly_active'
  | 'moderately_active'
  | 'very_active'
  | 'extra_active'

export type GoalType = 'lose' | 'maintain' | 'gain'

export interface Profile {
  id: string
  username: string
  email: string | null
  sex: 'male' | 'female'
  age: number
  height_cm: number
  current_weight_kg: number
  target_weight_kg: number
  activity_level: ActivityLevel
  goal_type: GoalType
  maintenance_calories: number
  daily_calorie_goal: number
  protein_goal: number
  carb_goal: number
  fat_goal: number
  created_at: string
  updated_at: string
}

export interface Food {
  id: string
  user_id: string | null
  name: string
  serving_label: string
  calories: number
  protein: number
  carbs: number
  fat: number
  created_at: string
}

export interface FoodLog {
  id: string
  user_id: string
  food_id: string
  food_name: string
  serving_label: string
  quantity: number
  calories: number
  protein: number
  carbs: number
  fat: number
  logged_at: string
  created_at: string
}

export interface WeightLog {
  id: string
  user_id: string
  weight_kg: number
  logged_at: string
  created_at: string
}

export interface DailyTotals {
  calories: number
  protein: number
  carbs: number
  fat: number
}
