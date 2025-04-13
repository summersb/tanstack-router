import {createFileRoute} from '@tanstack/react-router'
import queryClient from '@/queryClient'
import UserTable from '@/components/user/UserTable'
import type {User} from "@/types";


export const Route = createFileRoute('/users/')({
  component: Users,
  loader: async () => {
    const queryKey = ['users']
    const queryFn = async (): Promise<User[]> =>
      fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
        response.json()
      )
    const users = await queryClient.ensureQueryData({
      queryKey,
      queryFn,
    })
    return {users, queryKey}
  },
  pendingComponent: () => <>Loading ...</>,
  onError: (err) => {
    <div>Loading problem {JSON.stringify(err)}</div>
  },
})

function Users() {
  const {users} = Route.useLoaderData()

  return (
    <>
      <UserTable users={users}/>
    </>
  )
}
