import { Group } from "@/models/groups";
import Link from "@/components/Link";
import GroupOptions from "./Options";

type RowProps = {
  group: Group;
};

function Row(props: Readonly<RowProps>) {
  const { group } = props;

  let { labels } = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const strLabels = labels ? labels.map(l => l.name).join(" ") : " ";

  return (
    <tr className="tbl-hover">
      <td className="tbl-td">
        <Link href={`/groups/${group.id}`}>{group.displayName}</Link>
      </td>
      <td className="tbl-td">{strLabels}</td>
      <td className="tbl-td">
        <div className="mx-auto flex gap-1">
          <GroupOptions group={group} />
        </div>
      </td>
    </tr>
  );
}

type TableProps = {
  groups: Group[];
};

export default function GroupsTable(props: Readonly<TableProps>) {
  const { groups } = props;
  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="tbl-th text-left">Name</th>
          <th className="tbl-th text-left">Labels</th>
          <th className="tbl-th text-center" />
        </tr>
      </thead>
      <tbody>
        {groups.map(group => (
          <Row key={group.displayName} group={group} />
        ))}
      </tbody>
    </table>
  );
}
