import { Group } from "@/models/groups";
import { User, ScimReference } from "@/models/scim";
import Link from "@/components/link";
import { makeScimReferenceFromUser } from "@/utils/scim";
import { auth } from "@/auth";
import GroupOptions from "./options";

type RowProps = {
  group: Group;
  userRef?: ScimReference;
  isAdmin?: boolean;
};

function Row(props: Readonly<RowProps>) {
  const { group, userRef, isAdmin } = props;

  let { labels } = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const strLabels = labels ? labels.map(l => l.name).join(" ") : " ";

  return (
    <tr className="tbl-tr tbl-hover">
      <td className="tbl-td">
        <Link href={`/groups/${group.id}`}>{group.displayName}</Link>
      </td>
      <td className="tbl-td">{strLabels}</td>
      <td className="tbl-td w-1/12 text-center">
        <GroupOptions
          group={group}
          userRef={userRef}
          isAdmin={isAdmin}
        />
      </td>
    </tr>
  );
}

type TableProps = {
  groups: Group[];
  user?: User;
};

export default async function GroupsTable(
  props: Readonly<TableProps>
) {
  const { groups, user } = props;
  const userRef = user ? makeScimReferenceFromUser(user) : undefined;
  const session = await auth();
  const isAdmin = session?.is_admin ?? false;

  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="tbl-th text-left">Name</th>
          <th className="tbl-th text-left">Labels</th>
          <th className="tbl-th" />
        </tr>
      </thead>
      <tbody>
        {groups.map(group => (
          <Row
            key={group.displayName}
            group={group}
            userRef={userRef}
            isAdmin={isAdmin}
          />
        ))}
      </tbody>
    </table>
  );
}
