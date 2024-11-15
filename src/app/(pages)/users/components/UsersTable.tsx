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
  onDeleteUser?: (user: User) => void;
};

function Row(props: Readonly<RowProps>) {
  const { user, onDeleteUser } = props;

  const deleteUser = () => {
    onDeleteUser?.(user);
  };

  const created = user.meta?.created
    ? dateToHuman(new Date(user.meta.created))
    : "N/A";
  return (
    <tr className="tbl-hover">
      <td className="tbl-td">
        <Link href={`/users/${user.id}`}>{user.name?.formatted}</Link>
      </td>
      <td className="tbl-td">{user.emails?.[0].value}</td>
      <td className="tbl-td">{created}</td>
      <td className="tbl-td">
        <StatusIcon active={!!user.active} />
      </td>
      <td className="tbl-td text-center">
        <UserOptions user={user} />
      </td>
    </tr>
  );
}

type UsersTableProps = {
  users: User[];
  onDeleteUser?: (user: User) => void;
};

export default function UsersTable(props: Readonly<UsersTableProps>) {
  const { users, onDeleteUser } = props;
  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="tbl-th text-left">Name</th>
          <th className="tbl-th text-left">Email</th>
          <th className="tbl-th text-left">Created</th>
          <th className="tbl-th text-center">Status</th>
          <th className="tbl-th" />
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <Row key={user.id} user={user} onDeleteUser={onDeleteUser} />
        ))}
      </tbody>
    </table>
  );
}
