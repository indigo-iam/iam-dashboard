import { Group } from "@/models/groups";
import { fetchGroupMembersPage } from "@/services/groups";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/Table";
import Link from "next/link";
import UnlinkMemberButton from "./UnlinkMemberButton";

type MembersProps = {
  group: Group;
};
export default async function Members(props: Readonly<MembersProps>) {
  const { group } = props;
  // TODO: pagination
  const members = (await fetchGroupMembersPage(group.id)).Resources;

  if (members.length === 0) {
    return <p>This group has no members.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>User</TableHeaderCell>
        <TableHeaderCell className="text-center">Actions</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {members.map(member => {
          return (
            <TableRow key={member.value}>
              <TableCell>
                <Link
                  href={`/users/${member.value}`}
                  className="text-primary-600 underline"
                >
                  {member.display}
                </Link>
              </TableCell>
              <TableCell className="text-center">
                <UnlinkMemberButton user={member} group={group} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
