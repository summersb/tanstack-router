import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {useForm} from '@tanstack/react-form'
import type {User} from '@/types'
import queryClient from "@/queryClient.ts";
import FormInputField from "@/components/ui/FormInputField.tsx";
import Button from "@/components/ui/Button.tsx";
import {useMutation} from "@tanstack/react-query";
import {API_URL} from '@/config/APIConfig'

export const Route = createFileRoute('/users/$userId/edit')({
  component: EditUser,
  loader: async ({params: {userId}}) => {
    const queryKey = ['users', userId]
    const queryFn = async (): Promise<User> =>
      fetch(`${API_URL}/users/${userId}`).then(
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

function EditUser() {
  const {user} = Route.useLoaderData()
  const navigate = useNavigate()

  const updateUser = async (user: User) => {
    const response = await fetch(`${API_URL}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    if (response.ok) {
      return response.json()
    }
    throw new Error('Could not update user')
  }

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      console.log("Update success", data)
      navigate({to: "/users"})
    },
    onError: (error) => {
      console.log("Update error", error)
    }
  })

  const form = useForm({
    defaultValues: user,
    onSubmit: async ({value}) => {
      console.log('Submitted:', value)
      mutation.mutate(value)
      // Make a PUT/PATCH request here
    },
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit()
    }} className="space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Edit User</h1>

      <form.Field name="name">
        {(field) => <FormInputField label="Name" field={field}/>}
      </form.Field>

      <form.Field name="username">
        {(field) => <FormInputField label="Username" field={field}/>}
      </form.Field>

      <form.Field name="email">
        {(field) => <FormInputField label="Email" field={field}/>}
      </form.Field>

      <form.Field name="phone">
        {(field) => <FormInputField label="Phone" field={field}/>}
      </form.Field>

      <form.Field name="website">
        {(field) => <FormInputField label="Website" field={field}/>}
      </form.Field>

      <h2 className="font-semibold mt-6">Address</h2>

      <form.Field name="address.street">
        {(field) => <FormInputField label="Street" field={field}/>}
      </form.Field>

      <form.Field name="address.suite">
        {(field) => <FormInputField label="Suite" field={field}/>}
      </form.Field>

      <form.Field name="address.city">
        {(field) => <FormInputField label="City" field={field}/>}
      </form.Field>

      <form.Field name="address.zipcode">
        {(field) => <FormInputField label="Zipcode" field={field}/>}
      </form.Field>

      <h2 className="font-semibold mt-6">Company</h2>

      <form.Field name="company.name">
        {(field) => <FormInputField label="Company name" field={field}/>}
      </form.Field>

      <form.Field name="company.catchPhrase">
        {(field) => <FormInputField label="Catch Phrase" field={field}/>}
      </form.Field>

      <form.Field name="company.bs">
        {(field) => <FormInputField label="BS" field={field}/>}
      </form.Field>

      <Button type="submit">
        Save
      </Button>
    </form>
  )
}
