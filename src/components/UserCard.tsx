import type { User as UserType } from '@/routes/users'

type UserProps = {
  user: UserType
}

const UserCard = (props: UserProps) => {
  const { user } = props

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-4 border border-gray-200 dark:border-gray-700">
      <div className="text-xl font-semibold text-gray-800 dark:text-white">
        {user.name}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        @{user.username}
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300">
        📧{' '}
        <a href={`mailto:${user.email}`} className="underline">
          {user.email}
        </a>
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300">
        📞 {user.phone}
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300">
        🌐{' '}
        <a
          href={`https://${user.website}`}
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          {user.website}
        </a>
      </div>

      <div>
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

      <div>
        <h3 className="text-md font-medium text-gray-800 dark:text-white">
          🏢 Company
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 font-semibold">
          {user.company.name}
        </p>
        <p className="text-sm italic text-gray-500 dark:text-gray-400">
          "{user.company.catchPhrase}"
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {user.company.bs}
        </p>
      </div>
    </div>
  )
}

export {  UserCard }
