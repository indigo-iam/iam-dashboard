import { ScimReference, User } from "@/models/scim";
import Link from "@/components/Link";
import getConfig from "@/utils/config";
import GroupOptions from "./Options";

const { BASE_URL } = getConfig();

type RowProps = {
  groupRef: ScimReference;
  userRef: ScimReference;
};

const Row = (props: Readonly<RowProps>) => {
  const { groupRef, userRef } = props;
  return (
    <tr className="tbl-tr">
      <td className="tbl-td grow">
        <Link href={`/groups/${groupRef.value}`}>{groupRef.display}</Link>
      </td>
      <td className="tbl-td w-1/12 text-center">
        <GroupOptions
          userRef={userRef}
          groupId={groupRef.value}
          groupName={groupRef.display}
        />
      </td>
    </tr>
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
    <table className="w-full table-auto rounded-lg">
      <tbody>
        {groups.map(group => {
          return <Row key={group.value} groupRef={group} userRef={userRef} />;
        })}
      </tbody>
    </table>
  );
}
