import { createFileRoute } from '@tanstack/react-router'
import { TypewriterEffect } from '~/components/ui/typewriter-effect'

export const Route = createFileRoute('/community')({
  component: RouteComponent,
})

function RouteComponent() {
  const words = [
    { text: 'Desenvolvedores' },
    { text: 'não' },
    { text: 'evoluem' },
    { text: 'sozinhos.' },
    { text: 'Evoluem' },
    { text: 'em' },
    { text: 'comunidade.', className: 'text-primary' },
  ]

  return (
    <section className="flex min-h-[calc(100dvh-8rem)] items-center justify-center">
      <div className="flex w-full max-w-5xl flex-col items-center justify-center p-6 text-center sm:p-10">
        <p className="mb-8 text-sm text-white/80 sm:text-base">
          Código melhor, carreira mais forte e networking real entre desenvolvedores.
        </p>

        <TypewriterEffect words={words} />

        <a
          href="https://chat.whatsapp.com/GIrZlmjoAOqHMYeodJAcQs?mode=gi_t"
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex h-11 min-w-56 items-center justify-center rounded-xl border border-primary/60 bg-primary/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-primary/30"
        >
          Faça parte da comunidade
        </a>
      </div>
    </section>
  )
}
