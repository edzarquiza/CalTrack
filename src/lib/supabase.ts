import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// supabase-js doesn't send apikey header for auth requests with new sb_publishable_* keys
const injectApiKey = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const headers = new Headers(init?.headers)
  if (!headers.has('apikey')) headers.set('apikey', supabaseAnonKey)
  if (!headers.has('Authorization')) headers.set('Authorization', `Bearer ${supabaseAnonKey}`)
  return fetch(input, { ...init, headers })
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'caltrack-auth',
  },
  global: {
    fetch: injectApiKey,
  },
})
