import { Section } from "@/components/layout";
import { User } from "@/models/scim";
import { fetchManagedGroups } from "@/services/groups";
import { ManagedGroup } from "@/models/groups";
import Link from "next/link";
import GroupOptions from "./options";
import { makeScimReferenceFromManagedGroup } from "@/utils/scim";

type RowProps = {
  group: ManagedGroup;
};

function Row(props: Readonly<RowProps>) {
  const { group } = props;
  const groupRef = makeScimReferenceFromManagedGroup(group);
  return (
    <li className="flex flex-row border-b p-2 hover:rounded-md hover:bg-neutral-200 has-[+:hover]:border-transparent dark:hover:bg-neutral-200/10">
      <Link
        className="flex grow flex-col hover:underline"
        href={`/groups/${group.id}`}
      >
        {group.name}
        <small>{group.id}</small>
      </Link>
      <GroupOptions groupRef={groupRef} />
    </li>
  );
}

type ManagedGroupsProps = {
  user: User;
};

export default async function ManagedGroups(
  props: Readonly<ManagedGroupsProps>
) {
  const { user } = props;
  const groups = await fetchManagedGroups(user.id);
  return (
    <Section title="Managed">
      <ul className="w-full">
        {groups.map(group => (
          <Row key={group.id} group={group} />
        ))}
      </ul>
    </Section>
  );
}
