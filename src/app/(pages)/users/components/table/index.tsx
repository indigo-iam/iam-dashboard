import { User } from "@/models/scim";
import { dateToHuman } from "@/utils/dates";
import Link from "next/link";
import UserOptions from "./options";

const ActiveStatus = (props: { active: boolean }) => {
  const { active } = props;
  const status = active ? "Active" : "Disabled";
  return (
    <small
      title={`${active ? "Active" : "Disabled"}`}
      className="data-[status=disabled] my-auto rounded-full bg-danger p-0.5 px-2 text-xs text-secondary data-[status=Active]:bg-success"
      data-status={status}
    >
      {status}
    </small>
  );
};

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
        <div className="flex flex-col items-end px-4">
          <ActiveStatus active={!!user.active} />
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
