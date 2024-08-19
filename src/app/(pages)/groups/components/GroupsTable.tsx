import { AddButton, DeleteButton } from "@/components/Buttons";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/Table";
import { Group } from "@/models/groups";
import Link from "next/link";

function AddSubgroup(props: Readonly<{ onAddSubgroup: () => void }>) {
  const action = () => {
    props.onAddSubgroup();
  };

  return (
    <form action={action}>
      <AddButton type="submit" title="Add Subgroup" />
    </form>
  );
}

function DeleteGroup(props: Readonly<{ onDeleteGroup: () => void }>) {
  const action = () => {
    props.onDeleteGroup();
  };

  return (
    <form action={action}>
      <DeleteButton type="submit" title="Delete Group" />
    </form>
  );
}

type RowProps = {
  group: Group;
  onAddSubgroup?: (rootGroup: Group) => void;
  onDeleteGroup?: (group: Group) => void;
};

function Row(props: Readonly<RowProps>) {
  const { group, onAddSubgroup, onDeleteGroup } = props;

  const addSubgroup = () => {
    onAddSubgroup?.(group);
  };

  const deleteGroup = () => {
    onDeleteGroup?.(group);
  };

  let { labels } = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const strLabels = labels ? labels.map(l => l.name).join(" ") : " ";

  return (
    <TableRow>
      <TableCell>
        <Link
          href={`/groups/${group.id}`}
          className="text-primary-600 underline"
        >
          {group.displayName}
        </Link>
      </TableCell>
      <TableCell>{strLabels}</TableCell>
      <TableCell className="flex">
        <div className="mx-auto flex gap-1">
          <DeleteGroup onDeleteGroup={deleteGroup} />
          <AddSubgroup onAddSubgroup={addSubgroup} />
        </div>
      </TableCell>
    </TableRow>
  );
}

type TableProps = {
  groups: Group[];
  onDeleteGroup?: (group: Group) => void;
  onAddSubgroup?: (rootGroup: Group) => void;
};

export default function GroupsTable(props: Readonly<TableProps>) {
  const { groups, onDeleteGroup, onAddSubgroup } = props;
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
            onDeleteGroup={onDeleteGroup}
            onAddSubgroup={onAddSubgroup}
          />
        ))}
      </TableBody>
    </Table>
  );
}
