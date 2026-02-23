import { createFileRoute } from '@tanstack/react-router'
import { BackgroundBeamsWithCollision } from '~/components/ui/BackgroundBeams'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <BackgroundBeamsWithCollision>
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-white font-sans tracking-tight">
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
    </BackgroundBeamsWithCollision>
  )
}
