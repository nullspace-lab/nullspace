import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { getSupabaseServerClient } from '~/utils/supabase'

const callbackSchema = z.object({
  code: z.string().optional(),
  next: z.string().optional(),
})

const oauthCallbackFn = createServerFn({ method: 'GET' })
  .inputValidator((d: unknown) => callbackSchema.parse(d ?? {}))
  .handler(async ({ data }) => {
    const code = data.code
    let next = data.next ?? '/'

    if (!next.startsWith('/')) {
      next = '/'
    }

    if (!code) {
      throw redirect({ href: next })
    }

    const supabase = getSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      throw redirect({ href: '/login' })
    }

    throw redirect({ href: next })
  })

export const Route = createFileRoute('/auth/callback')({
  validateSearch: (search) => callbackSchema.parse(search ?? {}),
  loader: ({ search }) => oauthCallbackFn({ data: search }),
  component: () => (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-white/70">
      Finalizando login...
    </div>
  ),
})
