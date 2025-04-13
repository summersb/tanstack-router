import type {User} from "@/types";

type Props = {
  user: User;
}

const UserContact: React.FC<Props> = (props: Props) => {
  const {email, phone, website} = props.user

  return (
    <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
      <div>
        {`📧 Email: `}
        <a href={`mailto:${email}`} className="underline text-blue-500">{email}</a>
      </div>
      <div>
        📞 {phone}
      </div>
      <div>
        🌐{' '}
        Website: <a href={`https://${website}`} target="_blank" rel="noreferrer"
                    className="underline text-blue-500">{website}</a></div>
    </div>
  )
}

export default UserContact
