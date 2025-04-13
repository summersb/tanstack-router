import type { User } from '@/types'
import InfoCard from "@/components/ui/InfoCard.tsx";
import UserContact from "@/components/user/UserContact.tsx";
import UserAddress from "@/components/user/UserAddress.tsx";
import UserCompany from "@/components/user/UserCompany.tsx";

type UserProps = {
  user: User
}

const UserCard = (props: UserProps) => {
  const { user } = props

  return (
    <InfoCard
      title={user.name}
      className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-4 border border-gray-200 dark:border-gray-700">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        @{user.username}
      </div>
      <UserContact user={user}/>
      <UserAddress user={user}/>
      <UserCompany user={user}/>
    </InfoCard>
  )
}

export {  UserCard }
