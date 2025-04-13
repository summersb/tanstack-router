import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  console.log("root/about.tsx")
  return <div className="p-2">Hello from About!</div>
}
