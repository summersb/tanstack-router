import {createFileRoute} from '@tanstack/react-router'
import TodoCard from "@/components/TodoCard.tsx";

export const Route = createFileRoute('/todos/$todoId')({
  component: Todo,
  loader: async ({params: {todoId}}) =>
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .then(res => res.json()),
  pendingComponent: () => <>Loading...</>
})

function Todo() {
  const todo = Route.useLoaderData()

  return (
    <div>
      <TodoCard todo={todo}/>
    </div>
  )
}
