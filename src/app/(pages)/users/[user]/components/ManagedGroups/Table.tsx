import Link from "@/components/Link";
import { ManagedGroup } from "@/models/groups";

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
          <tr key={group.id} className="tbl-tr">
            <td className="tbl-td">
              <Link href={`/groups/${group.id}`}>{group.name}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
