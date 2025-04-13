import {queryClient} from '@/main'
import {createFileRoute} from '@tanstack/react-router'
import TodoTable from "@/components/TodoTable.tsx";

export const Route = createFileRoute('/todos/')({
  component: RouteComponent,
  loader: async () => {
    const queryKey = ['todos']
    const queryFn = async (): Promise<Todo[]> => fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
    const todo = await queryClient.ensureQueryData({
      queryKey, queryFn
    })
    return {todo, queryKey}
  },
  pendingComponent: () => <>Loading ...</>,
  onError: (err) => {
    <div>Loading problem {JSON.stringify(err)}</div>
  }
})

export type Todo = {
  id: number
  userId: number
  title: string
  completed: boolean
}

function RouteComponent() {
  const {todo} = Route.useLoaderData()
  console.log("todos/index.tsx")

  return (
    <div>
      <TodoTable todos={todo}/>
    </div>
  )
}
