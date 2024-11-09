import { ScimReference, User } from "@/models/scim";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/Table";
import Link from "@/components/Link";
import { UnlinkMemberButton } from "@/components/Buttons";
import getConfig from "@/utils/config";

const { BASE_URL } = getConfig();

type RowProps = {
  groupRef: ScimReference;
  userRef: ScimReference;
};

const Row = (props: Readonly<RowProps>) => {
  const { groupRef, userRef } = props;
  return (
    <TableRow>
      <TableCell className="grow">
        <Link href={`/groups/${groupRef.value}`}>{groupRef.display}</Link>
      </TableCell>
      <TableCell className="text-center">
        <UnlinkMemberButton
          userRef={userRef}
          groupId={groupRef.value}
          groupName={groupRef.display}
        />
      </TableCell>
    </TableRow>
  );
};

type GroupsTableProps = {
  user: User;
};

export default function GroupsTable(props: Readonly<GroupsTableProps>) {
  const { user } = props;
  const { groups } = user;

  if (!groups || groups.length === 0) {
    return <p>No groups found</p>;
  }

  const userRef: ScimReference = {
    $ref: `${BASE_URL}/scim/Users${user.id}`,
    display: user.name?.formatted ?? "unknown user",
    value: user.id,
  };

  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>Group</TableHeaderCell>
        <TableHeaderCell className="w-1/12 text-center">
          Actions
        </TableHeaderCell>
      </TableHeader>
      <TableBody>
        {groups.map(group => {
          return <Row key={group.value} groupRef={group} userRef={userRef} />;
        })}
      </TableBody>
    </Table>
  );
}
