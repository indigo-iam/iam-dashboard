import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/Table";
import { Group } from "@/models/groups";
import Link from "@/components/Link";
import AddSubgroupButton from "./AddSubgroupButton";
import DeleteGroupButton from "./DeleteGroupButton";
import { ScimReference } from "@/models/scim";

type RowProps = {
  group: Group;
  onGroupDeleted?: () => void;
  onSubgroupAdded?: () => void;
};

function Row(props: Readonly<RowProps>) {
  const { group, onGroupDeleted, onSubgroupAdded } = props;

  let { labels } = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const strLabels = labels ? labels.map(l => l.name).join(" ") : " ";

  const groupRef: ScimReference = {
    display: group.displayName,
    value: group.id,
    $ref: `/groups/${group.id}`,
  };

  return (
    <TableRow>
      <TableCell>
        <Link href={`/groups/${group.id}`}>{group.displayName}</Link>
      </TableCell>
      <TableCell>{strLabels}</TableCell>
      <TableCell className="flex">
        <div className="mx-auto flex gap-1">
          <DeleteGroupButton group={groupRef} onDeleted={onGroupDeleted} />
          <AddSubgroupButton rootGroup={group} onAdded={onSubgroupAdded} />
        </div>
      </TableCell>
    </TableRow>
  );
}

type TableProps = {
  groups: Group[];
  onGroupDeleted?: () => void;
  onSubgroupAdded?: () => void;
};

export default function GroupsTable(props: Readonly<TableProps>) {
  const { groups, onGroupDeleted, onSubgroupAdded } = props;
  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Labels</TableHeaderCell>
        <TableHeaderCell className="text-center">Actions</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {groups.map(group => (
          <Row
            key={group.displayName}
            group={group}
            onGroupDeleted={onGroupDeleted}
            onSubgroupAdded={onSubgroupAdded}
          />
        ))}
      </TableBody>
    </Table>
  );
}
