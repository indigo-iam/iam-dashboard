import { User } from "@/models/scim";
import { Group } from "@/models/groups";
import ManagerOptions from "./options";
import Link from "next/link";

function Row(props: Readonly<{ manager: User; group: Group }>) {
  const { manager, group } = props;
  return (
    <li className="flex flex-row border-b p-2 hover:rounded-md hover:bg-neutral-200 has-[+:hover]:border-transparent">
      <div className="flex grow flex-col">
        <Link
          className="flex grow flex-col font-bold hover:underline"
          href={`/users/${manager.id}`}
        >
          {manager.displayName}
          <small className="iam-text-light">{manager.id}</small>
        </Link>
      </div>
      <div className="flex flex-col">
        <ManagerOptions manager={manager} group={group} />
      </div>
    </li>
  );
}

type ManagerTableProps = {
  group: Group;
  managers: User[];
};

export default function ManagersTable(props: Readonly<ManagerTableProps>) {
  const { group, managers } = props;

  if (managers.length === 0) {
    return <p>This group has no managers.</p>;
  }

  return (
    <ul className="w-full">
      {managers.map(manager => (
        <Row key={manager.id} manager={manager} group={group} />
      ))}
    </ul>
  );
}
