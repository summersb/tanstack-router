import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todos/$todoId')({
  component: Todo,
  loader: async ({ params: { todoId } }) =>
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .then(res => res.json()),
  pendingComponent: () => <>Loading...</>
})

function Todo() {
  const todo = Route.useLoaderData()

  return <div>
    <div>
      Title: {todo.title}
    </div>
    <div>
      Completed: {todo.completed ? 'True': 'False'}
    </div>
  </div>
}
