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
    <div className="flex flex-row border-b p-2 hover:rounded-md hover:bg-neutral-200">
      <Link
        className="flex grow flex-col font-bold hover:underline"
        href={`/users/${user.id}`}
      >
        {user.name?.formatted}
        <small className="iam-text-light">{user.emails?.[0].value}</small>
      </Link>
      <div className="flex flex-row">
        <div className="flex flex-col items-end px-2">
          <Status active={user.active ?? false} />
          <small className="iam-text-light">Created {created}</small>
        </div>
        <UserOptions user={user} />
      </div>
    </div>
  );
}

type UsersTableProps = {
  users: User[];
};

export default function UsersTable(props: Readonly<UsersTableProps>) {
  const { users } = props;
  return (
    <div className="w-full">
      {users.map(user => (
        <Row key={user.id} user={user} />
      ))}
    </div>
  );
}
