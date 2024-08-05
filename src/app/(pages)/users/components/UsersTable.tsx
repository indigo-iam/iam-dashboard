import Paginator from "@/components/Paginator";
import { User } from "@/models/user";
import { deleteUser, getUsersPage } from "@/services/users";
import { dateToHuman } from "@/utils/dates";
import { XMarkIcon } from "@heroicons/react/16/solid";

function ActiveIcon(props: Readonly<{ active: boolean }>) {
  const { active } = props;
  return (
    <div
      className={`${active ? "bg-success" : "bg-danger"} mx-auto h-3 w-3 rounded-full`}
    />
  );
}

function DeleteUserButton(props: Readonly<{ user: User }>) {
  const { user } = props;
  const action = async () => {
    "use server";
    deleteUser(user);
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
  user: User;
};

function Row(props: Readonly<RowProps>) {
  const { user } = props;
  const created = user.meta.created
    ? dateToHuman(new Date(user.meta.created))
    : "N/A";
  return (
    <tr className="text-sm">
      <td>{user.name.formatted}</td>
      <td>{user.emails[0].value}</td>
      <td>{created}</td>
      <td>
        <ActiveIcon active={user.active} />
      </td>
      <td className="text-center">
        <DeleteUserButton user={user} />
      </td>
    </tr>
  );
}

type TableProps = {
  users: User[];
  children?: React.ReactNode;
};

function Table(props: Readonly<TableProps>) {
  const { users, children } = props;
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
            <Row key={user.id} user={user} />
          ))}
        </tbody>
      </table>
      {children}
    </div>
  );
}

type UsersTableProps = { count?: string; page?: string };
export default async function UsersTable(props: Readonly<UsersTableProps>) {
  const { count, page } = props;

  let itemsPerPage = 10;
  let numberOfPages = 0;
  let currentPage = 0;
  let users: User[] = [];

  itemsPerPage = count ? parseInt(count) || itemsPerPage : itemsPerPage;
  currentPage = page ? parseInt(page) - 1 || currentPage : currentPage;

  const startIndex = currentPage * itemsPerPage + 1;

  try {
    const page = await getUsersPage(itemsPerPage, startIndex);
    users = page.Resources;
    const { totalResults } = page;
    numberOfPages = Math.ceil(totalResults / itemsPerPage);
  } catch (err) {
    return <h1>{`${err}`}</h1>;
  }

  return (
    <Table users={users}>
      <Paginator numberOfPages={numberOfPages} />
    </Table>
  );
}
