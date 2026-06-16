import { useState } from 'react'
import { ArrowLeft, Plus, Pencil, Trash2, ChefHat } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { useFoods } from '@/hooks/useFoods'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Food } from '@/types'

interface FoodForm {
  name: string
  serving_label: string
  calories: string
  protein: string
  carbs: string
  fat: string
}

const emptyForm: FoodForm = {
  name: '',
  serving_label: '1 serving',
  calories: '',
  protein: '0',
  carbs: '0',
  fat: '0',
}

export function CustomFoodPage() {
  const { profile } = useApp()
  const navigate = useNavigate()
  const { customFoods, createFood, updateFood, deleteFood } = useFoods(profile?.id)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Food | null>(null)
  const [form, setForm] = useState<FoodForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [deleteError, setDeleteError] = useState('')

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setError('')
    setDialogOpen(true)
  }

  function openEdit(food: Food) {
    setEditing(food)
    setForm({
      name: food.name,
      serving_label: food.serving_label,
      calories: String(food.calories),
      protein: String(food.protein),
      carbs: String(food.carbs),
      fat: String(food.fat),
    })
    setError('')
    setDialogOpen(true)
  }

  function updateField(field: keyof FoodForm, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSave() {
    if (!form.name || !form.calories) {
      setError('Name and calories are required.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const data = {
        name: form.name.trim(),
        serving_label: form.serving_label.trim() || '1 serving',
        calories: parseFloat(form.calories) || 0,
        protein: parseFloat(form.protein) || 0,
        carbs: parseFloat(form.carbs) || 0,
        fat: parseFloat(form.fat) || 0,
      }
      if (editing) {
        await updateFood(editing.id, data)
      } else {
        await createFood(data)
      }
      setDialogOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(food: Food) {
    if (!confirm(`Delete "${food.name}"?`)) return
    setDeleteError('')
    try {
      await deleteFood(food.id)
    } catch {
      setDeleteError(`Cannot delete "${food.name}" — it's been used in your food log. Remove those log entries first.`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-lg mx-auto">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-accent transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">My Foods</h1>
        </div>
        <Button size="sm" onClick={openCreate} className="gap-1">
          <Plus className="h-4 w-4" />
          New
        </Button>
      </div>

      <div className="flex-1 px-4 pb-4">
        {deleteError && (
          <p className="text-sm text-destructive mb-3 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2">
            {deleteError}
          </p>
        )}
        {customFoods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ChefHat className="h-12 w-12 mb-3 text-muted-foreground" />
            <p className="font-medium">No custom foods yet</p>
            <p className="text-sm text-muted-foreground mt-1">Create foods that aren't in the database</p>
            <Button className="mt-4" onClick={openCreate}>
              Create First Food
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {customFoods.map(food => (
              <div key={food.id} className="flex items-center gap-3 rounded-xl border bg-card p-3">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{food.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {food.serving_label} · {food.calories} kcal
                  </div>
                  <div className="text-xs text-muted-foreground">
                    P{food.protein}g · C{food.carbs}g · F{food.fat}g
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(food)}
                    className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(food)}
                    className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={open => !open && setDialogOpen(false)}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-sm">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Food' : 'New Custom Food'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Food Name</Label>
              <Input
                placeholder="e.g. Homemade Adobo"
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label>Serving Label</Label>
              <Input
                placeholder="e.g. 1 Cup, 1 Piece"
                value={form.serving_label}
                onChange={e => updateField('serving_label', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Calories (kcal)</Label>
              <Input
                type="number"
                inputMode="decimal"
                placeholder="0"
                value={form.calories}
                onChange={e => updateField('calories', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1.5">
                <Label className="text-xs text-blue-600">Protein (g)</Label>
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="0"
                  value={form.protein}
                  onChange={e => updateField('protein', e.target.value)}
                  className="text-center"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-orange-500">Carbs (g)</Label>
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="0"
                  value={form.carbs}
                  onChange={e => updateField('carbs', e.target.value)}
                  className="text-center"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-yellow-500">Fat (g)</Label>
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="0"
                  value={form.fat}
                  onChange={e => updateField('fat', e.target.value)}
                  className="text-center"
                />
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button className="w-full" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Food'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
