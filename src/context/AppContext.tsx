import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types'

const DOMAIN = 'caltrack.app'

function usernameToEmail(username: string): string {
  return `${username.toLowerCase().trim()}@${DOMAIN}`
}

interface AppContextType {
  user: User | null
  profile: Profile | null
  authLoading: boolean
  profileLoading: boolean
  signUp: (username: string, password: string, email?: string) => Promise<void>
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<Profile>
  refetchProfile: () => Promise<void>
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)

  const fetchProfile = useCallback(async (userId: string) => {
    setProfileLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    setProfile(data as Profile | null)
    setProfileLoading(false)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      setAuthLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [fetchProfile])

  async function signUp(username: string, password: string, email?: string) {
    const cleanUsername = username.toLowerCase().trim()

    const { data: available, error: checkError } = await supabase.rpc(
      'is_username_available',
      { p_username: cleanUsername },
    )
    if (checkError) throw checkError
    if (!available) throw new Error('Username is already taken')

    const { data, error } = await supabase.auth.signUp({
      email: usernameToEmail(cleanUsername),
      password,
    })
    if (error) throw error

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        username: cleanUsername,
        email: email?.trim() || null,
      })
      if (profileError) throw profileError
    }
  }

  async function signIn(username: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email: usernameToEmail(username),
      password,
    })
    if (error) throw error
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  async function updateProfile(updates: Partial<Profile>): Promise<Profile> {
    if (!user) throw new Error('Not authenticated')
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id)
      .select()
      .single()
    if (error) throw error
    setProfile(data as Profile)
    return data as Profile
  }

  async function refetchProfile() {
    if (user) await fetchProfile(user.id)
  }

  return (
    <AppContext.Provider
      value={{
        user,
        profile,
        authLoading,
        profileLoading,
        signUp,
        signIn,
        signOut,
        updateProfile,
        refetchProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
