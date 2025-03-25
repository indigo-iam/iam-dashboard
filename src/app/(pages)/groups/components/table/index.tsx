import { Group } from "@/models/groups";
import Link from "next/link";
import GroupOptions from "./options";
import { dateToHuman } from "@/utils/dates";

type RowProps = {
  group: Group;
};

function Row(props: Readonly<RowProps>) {
  const { group } = props;
  const created = group.meta?.created
    ? dateToHuman(new Date(group.meta.created))
    : "N/A";
  return (
    <li className="flex flex-row border-b p-2 hover:rounded-md hover:bg-neutral-200 has-[+:hover]:border-transparent dark:hover:bg-neutral-200/10">
      <div className="flex grow flex-col">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            className="flex flex-col font-bold hover:underline"
            href={`/groups/${group.id}`}
          >
            {group.displayName}
            <small className="iam-text-light">{group.id}</small>
          </Link>
          <div className="my-auto flex grow flex-col">
            <div className="inline-flex gap-2 sm:flex-col sm:items-end sm:gap-0">
              <small className="iam-text-light">Created {created}</small>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <GroupOptions group={group} />
      </div>
    </li>
  );
}

type TableProps = {
  groups: Group[];
};

export default async function GroupsTable(props: Readonly<TableProps>) {
  const { groups } = props;
  return (
    <ul className="w-full table-auto">
      {groups.map(group => (
        <Row key={group.id} group={group} />
      ))}
    </ul>
  );
}
