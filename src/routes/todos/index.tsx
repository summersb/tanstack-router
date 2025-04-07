import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/todos/')({
  component: RouteComponent,
  loader: async (): Promise<Todo[]> =>
      fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json()),
  pendingComponent: () => <>Loading ...</>,
  onError: (err) => {
    <div>Loading problem {JSON.stringify(err)}</div>
  }
})

type Todo = {
  id: number
  userId: number
  title: string
  completed: boolean
}

function RouteComponent() {
  const posts = Route.useLoaderData()

  return (<div>
    {posts.map(p => (
      <div key={p.id}>
        <Link to="/todos/$todoId" params={{ todoId: String(p.id) }}>
          {p.title}
        </Link>
      </div>
    )) }
    </div>)
}
