import { queryClient } from '@/main'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/todos/')({
  component: RouteComponent,
  loader: async () => {
    const queryKey = ['todos']
    const queryFn = async (): Promise<Todo[]> => fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
    const todo = await queryClient.ensureQueryData({
      queryKey, queryFn
    })
    return { todo, queryKey }
  },
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
  const {todo} = Route.useLoaderData()

  return (<div>
    {todo.map(p => (
      <div key={p.id} className='p-4 border-blue-500 border-2'>
        <Link to="/todos/$todoId" params={{ todoId: String(p.id) }}>
          {p.title}
        </Link>
      </div>
    )) }
    </div>)
}
