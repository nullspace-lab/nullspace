import { getCookies, setCookie } from '@tanstack/react-start/server'
import { createServerClient } from '@supabase/ssr'

type ServerCookie = {
  name: string
  value: string
  options?: Parameters<typeof setCookie>[2]
}

export function getSupabaseServerClient() {
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.entries(getCookies()).map(([name, value]) => ({
            name,
            value,
          }))
        },
        setAll(cookies: ServerCookie[]) {
          cookies.forEach((cookie) => {
            setCookie(cookie.name, cookie.value, cookie.options)
          })
        },
      },
    },
  )
}
