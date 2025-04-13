import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  console.log("root/index.tsx")
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}
