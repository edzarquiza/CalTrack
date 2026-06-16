import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { AppProvider, useApp } from '@/context/AppContext'
import { AppShell } from '@/components/layout/AppShell'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/useToast'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { OnboardingPage } from '@/pages/onboarding/OnboardingPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { FoodSearchPage } from '@/pages/food/FoodSearchPage'
import { CustomFoodPage } from '@/pages/food/CustomFoodPage'
import { WeightPage } from '@/pages/weight/WeightPage'
import { ProfilePage } from '@/pages/profile/ProfilePage'

function AuthGate() {
  const { user, profile, authLoading, profileLoading } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (authLoading || profileLoading) return

    const publicRoutes = ['/login', '/signup']
    const isPublic = publicRoutes.includes(location.pathname)

    if (!user && !isPublic) {
      navigate('/login', { replace: true })
      return
    }

    if (user && isPublic) {
      if (profile && isProfileComplete(profile)) {
        navigate('/dashboard', { replace: true })
      } else if (profile) {
        navigate('/onboarding', { replace: true })
      }
      return
    }

    if (user && profile && !isProfileComplete(profile) && location.pathname !== '/onboarding') {
      navigate('/onboarding', { replace: true })
    }
  }, [user, profile, authLoading, profileLoading, location.pathname, navigate])

  return null
}

function isProfileComplete(profile: { sex?: string | null; daily_calorie_goal?: number | null }): boolean {
  return !!(profile.sex && profile.daily_calorie_goal)
}

function AppRoutes() {
  const { toasts, toast: _toast, dismiss } = useToast()

  return (
    <>
      <AuthGate />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route
          path="/dashboard"
          element={
            <AppShell>
              <DashboardPage />
            </AppShell>
          }
        />
        <Route
          path="/food/search"
          element={<FoodSearchPage />}
        />
        <Route
          path="/food/custom"
          element={<CustomFoodPage />}
        />
        <Route
          path="/weight"
          element={
            <AppShell>
              <WeightPage />
            </AppShell>
          }
        />
        <Route
          path="/profile"
          element={
            <AppShell>
              <ProfilePage />
            </AppShell>
          }
        />
      </Routes>
      <Toaster toasts={toasts} dismiss={dismiss} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  )
}
