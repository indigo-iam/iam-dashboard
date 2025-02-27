import Link from "@/components/link";
import { ManagedGroup } from "@/models/groups";

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
  groups: ManagedGroup[];
};

export default function ManagedGroupsTable(
  props: Readonly<TableProps>
) {
  const { groups } = props;

  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="tbl-th text-left">Name</th>
          <th className="tbl-th text-left">Description</th>
        </tr>
      </thead>
      <tbody>
        {groups.map(group => (
          <Row
            key={group.id}
            group={group}
          />
        ))}
      </tbody>
    </table>
  );
}
