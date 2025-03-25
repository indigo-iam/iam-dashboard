import { Group } from "@/models/groups";
import { ScimReference } from "@/models/scim";
import { fetchSubgroupsPage } from "@/services/groups";
import Link from "next/link";

function Row(props: Readonly<{ groupRef: ScimReference }>) {
  const { groupRef } = props;
  return (
    <li className="flex flex-row border-b p-2 hover:rounded-md hover:bg-neutral-200 has-[+:hover]:border-transparent dark:hover:bg-neutral-200/10">
      <Link
        className="flex grow flex-col font-bold hover:underline"
        href={`/groups/${groupRef.value}`}
      >
        {groupRef.display}
        <small className="iam-text-light">{groupRef.value}</small>
      </Link>
    </li>
  );
}

type SubgroupsTableProps = {
  group: Group;
};

export default async function SubgroupsTable(
  props: Readonly<SubgroupsTableProps>
) {
  const { group } = props;
  // TODO: pagination
  const firstPage = await fetchSubgroupsPage(group.id);
  const subgroups = firstPage.Resources;

  if (subgroups.length === 0) {
    return <p>This group has no subgroups.</p>;
  }

  return (
    <ul className="w-full">
      {subgroups.map(groupRef => (
        <Row key={groupRef.value} groupRef={groupRef} />
      ))}
    </ul>
  );
}
