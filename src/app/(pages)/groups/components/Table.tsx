import { Group } from "@/models/groups";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { PlusIcon } from "@heroicons/react/24/outline";

function AddSubGroup(props: Readonly<{ onAddSubGroup: () => void }>) {
  const action = () => {
    props.onAddSubGroup();
  };

  return (
    <form action={action}>
      <button
        type="submit"
        className="mx-auto w-5 rounded-md bg-success p-0.5 text-secondary"
      >
        <PlusIcon />
      </button>
    </form>
  );
}

function DeleteGroupButton(props: Readonly<{ onDeleteGroup: () => void }>) {
  const action = () => {
    props.onDeleteGroup();
  };

  return (
    <form action={action}>
      <button
        type="submit"
        className="mx-auto w-5 rounded-md bg-danger p-0.5 text-secondary"
      >
        <XMarkIcon />
      </button>
    </form>
  );
}

type RowProps = {
  group: Group;
  onDeleteGroup?: (group: Group) => void;
};

function Row(props: Readonly<RowProps>) {
  const { group, onDeleteGroup } = props;

  const deleteGroup = () => {
    onDeleteGroup?.(group);
  };

  let { labels } = group["urn:indigo-dc:scim:schemas:IndigoGroup"];
  const strLabels = labels ? labels.map(l => l.name).join(" ") : " ";

  return (
    <tr className="text-sm">
      <td>{group.displayName}</td>
      <td>{strLabels}</td>
      <td className="flex">
        <div className="mx-auto flex gap-1">
          <DeleteGroupButton onDeleteGroup={deleteGroup} />
          <AddSubGroup onAddSubGroup={() => group} />
        </div>
      </td>
    </tr>
  );
}

type TableProps = {
  groups: Group[];
  children: React.ReactNode;
  onDeleteGroup?: (group: Group) => void;
};

export default function Table(props: Readonly<TableProps>) {
  const {  children, groups, onDeleteGroup } = props;
  return (
    <div className="w-full space-y-4 rounded-xl border bg-secondary p-2 shadow-xl">
      <table className="w-full table-auto border-0">
        <thead>
          <tr className="hover:bg-secondary">
            <th>Name</th>
            <th>Labels</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <Row
              key={group.displayName}
              group={group}
              onDeleteGroup={onDeleteGroup}
            />
          ))}
        </tbody>
      </table>
      {children}
    </div>
  );
}
