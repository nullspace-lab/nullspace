import { createFileRoute } from '@tanstack/react-router'
import { Vortex } from '~/components/ui/Vortex'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <Vortex
      containerClassName="relative min-h-[calc(100dvh-4rem)] lg:min-h-dvh"
      className="flex h-full w-full items-center justify-center"
      backgroundColor="transparent"
      baseHue={176}
      rangeHue={24}
      rangeY={120}
      particleCount={760}
      rangeRadius={2.2}
    >
      <div className="px-4 sm:px-8">
        <h2 className="relative z-20 text-center font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
          Bem-vindo ao{' '}
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_hsl(var(--primary)_/_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-primary via-ring to-primary [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span>Nullspace.</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-primary via-ring to-primary py-4">
              <span>Nullspace.</span>
            </div>
          </div>
        </h2>
        <p className="mt-6 text-center text-base font-medium text-white/80 sm:text-lg">
          Feito por devs para devs.
        </p>
      </div>
    </Vortex>
  )
}
