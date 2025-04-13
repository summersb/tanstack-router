import type {User} from "@/types";

type Props = {
  user: User
}

const UserAddress: React.FC<Props> = (props: Props): React.ReactElement => {
  const {user} = props

  return (
    <div className="text-sm text-gray-500 dark:text-gray-800">
      <h3 className="text-md font-medium text-gray-800 dark:text-white">
        🏠 Address
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {user.address.street}, {user.address.suite}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {user.address.city}, {user.address.zipcode}
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500">
        Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
      </p>
    </div>
  )
}

export default UserAddress
