import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/Table";
import { ScimUser } from "@/models/scim";
import Link from "next/link";
import RevokeManagerButton from "./RevokeManagerButton";
import { Group } from "@/models/groups";

type MembersTableProps = {
  group: Group;
  managers: ScimUser[];
};

export default function ManagersTable(props: Readonly<MembersTableProps>) {
  const { group, managers } = props;
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
                  className="text-primary-600 underline"
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
