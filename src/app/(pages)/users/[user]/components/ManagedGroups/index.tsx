import { User } from "@/models/scim";
import { fetchManagedGroups } from "@/services/groups";
import ManagedGroupsTable from "./Table";
import { Section } from "@/components/Layout";

type ManagedGroupsProps = {
  user: User;
};

export default async function ManagedGroups(
  props: Readonly<ManagedGroupsProps>
) {
  const { user } = props;
  const { managedGroups } = await fetchManagedGroups(user.id);
  if (managedGroups.length === 0) {
    return null;
  }
  return (
    <Section title="Managed Groups">
      <ManagedGroupsTable managedGroups={managedGroups} />
    </Section>
  );
}
