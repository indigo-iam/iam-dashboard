import { ScimReference, User } from "@/models/scim";
import Link from "@/components/link";

type RowProps = {
  groupRef: ScimReference;
};

function Row(props: Readonly<RowProps>) {
  const { groupRef } = props;
  return (
    <tr className="tbl-tr">
      <td className="tbl-td grow">
        <Link href={`/groups/${groupRef.value}`}>{groupRef.display}</Link>
      </td>
    </tr>
  );
}

type GroupsTableProps = {
  user: User;
};

export default function GroupsTable(props: Readonly<GroupsTableProps>) {
  const { user } = props;
  const { groups } = user;

  return (
    (!groups || groups.length === 0) ? (
      <p>No groups found</p>
    ) : (
      <table className="w-full table-auto rounded-lg">
        <tbody>
          {groups.map(group => (
            <Row key={group.value} groupRef={group} />
          ))}
        </tbody>
      </table>
    )
  );
}
