import { useState } from 'react'
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

interface ServingPickerProps {
  food: Food | null
  open: boolean
  onClose: () => void
  onConfirm: (food: Food, quantity: number) => Promise<void>
}

export function ServingPicker({ food, open, onClose, onConfirm }: ServingPickerProps) {
  const [quantity, setQuantity] = useState('1')
  const [saving, setSaving] = useState(false)

  if (!food) return null

  const qty = parseFloat(quantity) || 0
  const calories = Math.round(food.calories * qty)
  const protein = Math.round(food.protein * qty * 10) / 10
  const carbs = Math.round(food.carbs * qty * 10) / 10
  const fat = Math.round(food.fat * qty * 10) / 10

  async function handleConfirm() {
    if (!food || qty <= 0) return
    setSaving(true)
    try {
      await onConfirm(food, qty)
      setQuantity('1')
      onClose()
    } finally {
      setSaving(false)
    }
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setQuantity('1')
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-left">{food.name}</DialogTitle>
          <p className="text-sm text-muted-foreground text-left">Per {food.serving_label}</p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Servings ({food.serving_label})</Label>
            <Input
              id="quantity"
              type="number"
              inputMode="decimal"
              step="0.5"
              min="0.1"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              className="text-center text-lg font-semibold"
              autoFocus
            />
          </div>

          <div className="rounded-xl bg-muted/50 p-4">
            <div className="text-center mb-3">
              <span className="text-3xl font-bold">{calories}</span>
              <span className="text-muted-foreground text-sm ml-1">kcal</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <div className="font-semibold text-blue-600">{protein}g</div>
                <div className="text-muted-foreground text-xs">Protein</div>
              </div>
              <div>
                <div className="font-semibold text-orange-500">{carbs}g</div>
                <div className="text-muted-foreground text-xs">Carbs</div>
              </div>
              <div>
                <div className="font-semibold text-yellow-500">{fat}g</div>
                <div className="text-muted-foreground text-xs">Fat</div>
              </div>
            </div>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleConfirm}
            disabled={qty <= 0 || saving}
          >
            {saving ? 'Adding...' : 'Add to Log'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
