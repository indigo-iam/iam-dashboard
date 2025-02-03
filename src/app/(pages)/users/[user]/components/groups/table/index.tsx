import { ScimReference, User } from "@/models/scim";
import Link from "@/components/link";
import getConfig from "@/utils/config";
import GroupOptions from "./options";

const { BASE_URL } = getConfig();

type RowProps = {
  groupRef: ScimReference;
  userRef: ScimReference;
  isAdmin?: boolean;
};

const Row = (props: Readonly<RowProps>) => {
  const { groupRef, userRef, isAdmin } = props;
  return (
    <tr className="tbl-tr">
      <td className="tbl-td grow">
        {isAdmin ? (
          <Link href={`/groups/${groupRef.value}`}>{groupRef.display}</Link>
        ) : (
          groupRef.display
        )}
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
  isAdmin?: boolean;
};

export default function GroupsTable(props: Readonly<GroupsTableProps>) {
  const { user, isAdmin } = props;
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
          return (
            <Row
              key={group.value}
              groupRef={group}
              userRef={userRef}
              isAdmin={isAdmin}
            />
          );
        })}
      </tbody>
    </table>
  );
}
