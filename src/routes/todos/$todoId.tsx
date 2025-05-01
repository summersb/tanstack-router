import {createFileRoute} from '@tanstack/react-router'
import TodoCard from "@/components/todo/TodoCard.tsx";
import type {Todo} from "@/types";
import queryClient from "@/queryClient.ts";
import { API_URL } from '@/config/APIConfig';

export const Route = createFileRoute('/todos/$todoId')({
  component: Todo,
  loader: async ({params: {todoId}}) => {
    const queryKey = ['todos', todoId]
    const queryFn = async (): Promise<Todo> =>
      fetch(`${API_URL}/todos/${todoId}`).then(
        (response) => response.json()
      )
    const todo = await queryClient.ensureQueryData({
      queryKey,
      queryFn,
    })
    return {todo, queryKey}
  },
  pendingComponent: () => <>Loading...</>
})

function Todo() {
  const {todo} = Route.useLoaderData()

  return (
    <div>
      <TodoCard todo={todo}/>
    </div>
  )
}
