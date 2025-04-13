import type {User} from "@/types";

function UserCompany(props: { user: User }) {
  return <div>
    <h3 className="text-md font-medium text-gray-800 dark:text-white">
      🏢 Company
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-300 font-semibold">
      {props.user.company.name}
    </p>
    <p className="text-sm italic text-gray-500 dark:text-gray-400">
      "{props.user.company.catchPhrase}"
    </p>
    <p className="text-xs text-gray-400 dark:text-gray-500">
      {props.user.company.bs}
    </p>
  </div>;
}

export default UserCompany;
