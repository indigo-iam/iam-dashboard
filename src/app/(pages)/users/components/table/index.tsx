import { User } from "@/models/scim";
import { dateToHuman } from "@/utils/dates";
import Link from "next/link";
import UserOptions from "./options";
import { Status } from "@/components/badges";

type RowProps = {
  user: User;
};

function Row(props: Readonly<RowProps>) {
  const { user } = props;
  const created = user.meta?.created
    ? dateToHuman(new Date(user.meta.created))
    : "N/A";
  return (
    <li className="flex flex-row border-b p-2 hover:rounded-md hover:bg-neutral-200 has-[+:hover]:border-transparent">
      <div className="flex grow flex-col">
        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            className="flex grow flex-col font-bold hover:underline"
            href={`/users/${user.id}`}
          >
            {user.name?.formatted}
            <small className="iam-text-light">{user.emails?.[0].value}</small>
          </Link>
          <div className="my-auto flex grow flex-col">
            <div className="inline-flex gap-2 sm:flex-col sm:items-end sm:gap-0 sm:px-2">
              <Status active={user.active ?? false} />
              <small className="iam-text-light">Created {created}</small>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <UserOptions user={user} />
      </div>
    </li>
  );
}

type UsersTableProps = {
  users: User[];
};

export default function UsersTable(props: Readonly<UsersTableProps>) {
  const { users } = props;
  return (
    <ul className="w-full">
      {users.map(user => (
        <Row key={user.id} user={user} />
      ))}
    </ul>
  );
}
