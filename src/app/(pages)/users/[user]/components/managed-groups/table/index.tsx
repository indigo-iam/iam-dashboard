import Link from "@/components/link";
import { ManagedGroup } from "@/models/groups";

type RowProps = {
  group: ManagedGroup;
};

function Row(props: Readonly<RowProps>) {
  const { group } = props;
  return (
    <tr className="tbl-tr">
      <td className="tbl-td grow">
        <Link href={`/groups/${group.id}`}>{group.name}</Link>
      </td>
    </tr>
  );
}

type ManagedGroupsTableProps = {
  managedGroups: ManagedGroup[];
};

export default function ManagedGroupsTable(
  props: Readonly<ManagedGroupsTableProps>
) {
  const { managedGroups } = props;

  return (
    <table className="w-full table-auto rounded-lg">
      <tbody>
        {managedGroups.map(group => (
          <Row key={group.id} group={group} />
        ))}
      </tbody>
    </table>
  );
}
