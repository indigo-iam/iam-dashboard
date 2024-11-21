import { User } from "@/models/scim";
import { dateToHuman } from "@/utils/dates";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Link from "@/components/Link";
import UserOptions from "./Options";

function StatusIcon(props: Readonly<{ active: boolean }>) {
  const { active } = props;
  return (
    <div
      title={`${active ? "Enabled" : "Disabled"}`}
      className={`${active ? "bg-success" : "bg-danger"} mx-auto h-3 w-3 rounded-full`}
    />
  );
}

function DeleteUserButton(props: Readonly<{ onDeleteUser: () => void }>) {
  const action = () => {
    props.onDeleteUser();
  };

  return (
    <form action={action}>
      <button
        type="submit"
        className="mx-auto w-5 rounded-md bg-danger p-0.5 text-secondary"
        title="Delete client"
      >
        <XMarkIcon />
      </button>
    </form>
  );
}

type RowProps = {
  user: User;
};

function Row(props: Readonly<RowProps>) {
  const { user } = props;

  const created = user.meta?.created
    ? dateToHuman(new Date(user.meta.created))
    : "N/A";
  return (
    <tr className="tbl-tr tbl-hover">
      <td className="tbl-td">
        <Link href={`/users/${user.id}`}>{user.name?.formatted}</Link>
      </td>
      <td className="tbl-td">{user.emails?.[0].value}</td>
      <td className="tbl-td">{created}</td>
      <td className="tbl-td">
        <StatusIcon active={!!user.active} />
      </td>
      <td className="tbl-td w-1/12 text-center">
        <UserOptions user={user} />
      </td>
    </tr>
  );
}

type UsersTableProps = {
  users: User[];
};

export default function UsersTable(props: Readonly<UsersTableProps>) {
  const { users } = props;
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="tbl-tr">
          <th className="tbl-th text-left">Name</th>
          <th className="tbl-th text-left">Email</th>
          <th className="tbl-th text-left">Created</th>
          <th className="tbl-th text-center">Status</th>
          <th className="tbl-th" />
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <Row key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
}
