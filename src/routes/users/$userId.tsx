import {UserCard} from '@/components/user/UserCard.tsx'
import {createFileRoute} from '@tanstack/react-router'
import queryClient from '@/queryClient'
import type {User} from '@/types'

export const Route = createFileRoute('/users/$userId')({
  component: User,
  loader: async ({params: {userId}}) => {
    const queryKey = ['users', userId]
    const queryFn = async (): Promise<User> =>
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
        (response) => response.json()
      )
    const user = await queryClient.ensureQueryData({
      queryKey,
      queryFn,
    })
    return {user, queryKey}
  },
  pendingComponent: () => <>Loading...</>,
})

function User() {
  const {user} = Route.useLoaderData()

  return <UserCard user={user}/>
}
