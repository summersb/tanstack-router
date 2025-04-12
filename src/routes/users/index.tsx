import { createFileRoute, Link } from '@tanstack/react-router'
import { UserSummary } from '@/components/User'
import { queryClient } from '@/main'
//import UserTable from '@/components/UserTable'
import UserTable from '@/components/UserTable'

export type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

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
    return { users, queryKey }
  },
  pendingComponent: () => <>Loading ...</>,
  onError: (err) => {
    ;<div>Loading problem {JSON.stringify(err)}</div>
  },
})

function Users() {
  const { users } = Route.useLoaderData()

  return (
    <>
      <UserTable users={users} />
    </>
  )
}
