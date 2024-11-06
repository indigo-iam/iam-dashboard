import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/Table";
import { User } from "@/models/scim";
import Link from "next/link";
import RevokeManagerButton from "./RevokeButton";
import { Group } from "@/models/groups";

type MembersTableProps = {
  group: Group;
  managers: User[];
};

export default function ManagersTable(props: Readonly<MembersTableProps>) {
  const { group, managers } = props;

  if (managers.length === 0) {
    return <p>This group has no managers.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>User</TableHeaderCell>
        <TableHeaderCell className="text-center">Actions</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {managers.map(m => {
          return (
            <TableRow key={m.id}>
              <TableCell>
                <Link
                  href={`/users/${m.id}`}
                  className="text-primary-800 underline"
                >
                  {m.name?.formatted}
                </Link>
              </TableCell>
              <TableCell className="text-center">
                <RevokeManagerButton user={m} group={group} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
