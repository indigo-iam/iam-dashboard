import { ScimReference, User } from "@/models/scim";
import Link from "@/components/link";

type RowProps = {
  groupRef: ScimReference;
  isAdmin?: boolean;
};

function Row(props: Readonly<RowProps>) {
  const { groupRef, isAdmin } = props;

  return (
    <tr className="tbl-tr">
      <td className="tbl-td grow">
        {isAdmin ? (
          <Link href={`/groups/${groupRef.value}`}>{groupRef.display}</Link>
        ) : (
          groupRef.display
        )}
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

  return (
    (!groups || groups.length === 0) ? (
      <p>No groups found</p>
    ) : (
      <table className="w-full table-auto rounded-lg">
        <tbody>
          {groups.map(group => {
            return (
              <Row
                key={group.value}
                groupRef={group}
                isAdmin={isAdmin}
              />
            );
          })}
        </tbody>
      </table>
    )
  );
};
