import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/circles')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/community"!</div>
}
