import { ScimUser } from "@/models/scim";
import { dateToHuman } from "@/utils/dates";
import { XMarkIcon } from "@heroicons/react/16/solid";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/Table";
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
    <TableRow>
      <TableCell>
        <Link href={`/users/${user.id}`} className="text-primary-600 underline">
          {user.name?.formatted}
        </Link>
      </TableCell>
      <TableCell>{user.emails?.[0].value}</TableCell>
      <TableCell>{created}</TableCell>
      <TableCell>
        <ActiveIcon active={!!user.active} />
      </TableCell>
      <TableCell className="text-center">
        <DeleteUserButton onDeleteUser={deleteUser} />
      </TableCell>
    </TableRow>
  );
}

type UsersTableProps = {
  users: ScimUser[];
  onDeleteUser?: (user: ScimUser) => void;
};

export default function UsersTable(props: Readonly<UsersTableProps>) {
  const { users, onDeleteUser } = props;
  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Email</TableHeaderCell>
        <TableHeaderCell>Created</TableHeaderCell>
        <TableHeaderCell className="text-center">Active</TableHeaderCell>
        <TableHeaderCell className="text-center">Actions</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <Row key={user.id} user={user} onDeleteUser={onDeleteUser} />
        ))}
      </TableBody>
    </Table>
  );
}
