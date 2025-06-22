import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-8 space-y-2">
      <h3>Welcome Nullspace!!!</h3>
    </div>
  )
}
