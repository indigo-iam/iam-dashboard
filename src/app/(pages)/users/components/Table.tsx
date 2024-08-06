import { ScimUser } from "@/models/scim";
import { dateToHuman } from "@/utils/dates";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

function ActiveIcon(props: Readonly<{ active: boolean }>) {
  const { active } = props;
  return (
    <div
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
      >
        <XMarkIcon />
      </button>
    </form>
  );
}

type RowProps = {
  user: ScimUser;
  onDeleteUser?: (user: ScimUser) => void;
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
    <tr className="text-sm">
      <td>
        <Link href={`/users/${user.id}`} className="text-primary-600 underline">
          {user.name?.formatted}
        </Link>
      </td>
      <td>{user.emails?.[0].value}</td>
      <td>{created}</td>
      <td>
        <ActiveIcon active={!!user.active} />
      </td>
      <td className="text-center">
        <DeleteUserButton onDeleteUser={deleteUser} />
      </td>
    </tr>
  );
}

type TableProps = {
  users: ScimUser[];
  onDeleteUser?: (user: ScimUser) => void;
  children?: React.ReactNode;
};

export default function Table(props: Readonly<TableProps>) {
  const { users, onDeleteUser, children } = props;
  return (
    <div className="w-full space-y-4 rounded-xl border bg-secondary p-2 shadow-xl">
      <table className="w-full table-auto border-0">
        <thead>
          <tr className="hover:bg-secondary">
            <th>Name</th>
            <th>Email</th>
            <th>Created</th>
            <th className="text-center">Active</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <Row key={user.id} user={user} onDeleteUser={onDeleteUser} />
          ))}
        </tbody>
      </table>
      {children}
    </div>
  );
}
