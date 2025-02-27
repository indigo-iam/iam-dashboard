import { User, ScimReference } from "@/models/scim";
import Link from "@/components/link";
import { makeScimReferenceFromUser } from "@/utils/scim";
import GroupOptions from "./options";

type RowProps = {
  group: ScimReference;
  isAdmin: boolean;
  userRef?: ScimReference;
};

function Row(props: Readonly<RowProps>) {
  const { group, isAdmin, userRef } = props;

  return (
    <tr className="tbl-tr tbl-hover">
      <td className="tbl-td">
        {isAdmin ? (
          <Link href={`/groups/${group.value}`}>{group.display}</Link>
        ) : (
          group.display
        )}
      </td>
      <td className="tbl-td w-1/12 text-center">
        <GroupOptions
          group={group}
          isAdmin={isAdmin}
          userRef={userRef}
        />
      </td>
    </tr>
  );
}

type TableProps = {
  groups: ScimReference[];
  isAdmin: boolean;
  user?: User;
};

export default async function GroupsTable(
  props: Readonly<TableProps>
) {
  const { groups, isAdmin, user } = props;
  const userRef = user ? makeScimReferenceFromUser(user) : undefined;

  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="tbl-th text-left">Name</th>
          <th className="tbl-th" />
        </tr>
      </thead>
      <tbody>
        {groups.map(group => (
          <Row
            key={group.value}
            group={group}
            isAdmin={isAdmin}
            userRef={userRef}
          />
        ))}
      </tbody>
    </table>
  );
}
