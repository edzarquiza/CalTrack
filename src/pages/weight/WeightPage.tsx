import { useState } from 'react'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { useWeightLog } from '@/hooks/useWeightLog'
import { WeightChart } from '@/components/weight/WeightChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { today } from '@/lib/utils'

export function WeightPage() {
  const { profile } = useApp()
  const navigate = useNavigate()
  const { logs, latestWeight, addLog, deleteLog } = useWeightLog(profile?.id)

  const [weight, setWeight] = useState('')
  const [date, setDate] = useState(today())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleLog() {
    const w = parseFloat(weight)
    if (!w || w < 20 || w > 300) {
      setError('Enter a valid weight (20–300 kg).')
      return
    }
    setError('')
    setSaving(true)
    try {
      await addLog(w, date)
      setWeight('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save weight.')
    } finally {
      setSaving(false)
    }
  }

  // profile.current_weight_kg = initial onboarding weight (never overwritten)
  // latestWeight = most recent weight_log entry
  const initialWeight = profile?.current_weight_kg
  const targetWeight = profile?.target_weight_kg
  const currentWeight = latestWeight ?? initialWeight

  const weightChange = currentWeight != null && initialWeight != null && logs.length > 0
    ? currentWeight - initialWeight
    : null

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-lg mx-auto">
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-accent transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold">Weight Tracker</h1>
      </div>

      <div className="px-4 pb-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold">{currentWeight?.toFixed(1) ?? '—'}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Current (kg)</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className={`text-xl font-bold ${weightChange === null ? '' : weightChange < 0 ? 'text-green-600' : weightChange > 0 ? 'text-destructive' : ''}`}>
                {weightChange === null ? '—' : `${weightChange > 0 ? '+' : ''}${weightChange.toFixed(1)}`}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Change (kg)</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-green-600">{targetWeight?.toFixed(1) ?? '—'}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Goal (kg)</div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Trend (last 30 entries)</CardTitle>
          </CardHeader>
          <CardContent>
            <WeightChart logs={logs} targetWeight={targetWeight} />
          </CardContent>
        </Card>

        {/* Log form */}
        <Card>
          <CardHeader>
            <CardTitle>Log Weight</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="weight-input">Weight (kg)</Label>
                <Input
                  id="weight-input"
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  placeholder={currentWeight?.toFixed(1) ?? '70.0'}
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="date-input">Date</Label>
                <Input
                  id="date-input"
                  type="date"
                  value={date}
                  max={today()}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button className="w-full" onClick={handleLog} disabled={saving}>
              {saving ? 'Saving...' : 'Log Weight'}
            </Button>
          </CardContent>
        </Card>

        {/* Log history */}
        {logs.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold mb-2 text-muted-foreground">History</h2>
            <div className="space-y-1.5">
              {logs.slice(0, 14).map(log => (
                <div key={log.id} className="flex items-center justify-between rounded-xl border bg-card px-3 py-2.5">
                  <div>
                    <span className="font-semibold">{log.weight_kg} kg</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {new Date(log.logged_at + 'T00:00:00').toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteLog(log.id)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
