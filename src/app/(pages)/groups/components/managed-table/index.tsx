import Link from "@/components/link";
import { ManagedGroup } from "@/models/groups";
import { User } from "@/models/scim";
import { fetchManagedGroups } from "@/services/groups";

type RowProps = {
  group: ManagedGroup;
};

function Row(props: Readonly<RowProps>) {
  const { group } = props;

  return (
    <tr className="tbl-tr tbl-hover">
      <td className="tbl-td">
        <Link href={`/groups/${group.id}`}>{group.name}</Link>
      </td>
      <td className="tbl-td">
        {group.description ?? ""}
      </td>
    </tr>
  );
}

type TableProps = {
  user: User;
};

export default async function ManagedGroupsTable(
  props: Readonly<TableProps>
) {
  const { user } = props;
  const { managedGroups } = await fetchManagedGroups(user.id);

  // TODO: spostare questo controllo per dare null a tutta la Section parent invece
  if (managedGroups.length === 0) {
    return null;
  }

  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="tbl-th text-left">Name</th>
          <th className="tbl-th text-left">Description</th>
        </tr>
      </thead>
      <tbody>
        {managedGroups.map(group => (
          <Row
            key={group.id}
            group={group}
          />
        ))}
      </tbody>
    </table>
  );
}
