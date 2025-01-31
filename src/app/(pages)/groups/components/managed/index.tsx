import { Section } from "@/components/layout";
import { User } from "@/models/scim";
import ManagedGroupsTable from "./table";
import { Suspense } from "react";
import { fetchManagedGroups } from "@/services/groups";

type ManagedGroupsProps = {
  me?: User;
};

export default async function ManagedGroups(
  props: Readonly<ManagedGroupsProps>
) {
  const { me } = props;
  
  if (!me) {
    return null;
  }

  const { managedGroups } = await fetchManagedGroups(me.id);

  if (managedGroups.length === 0) {
    return null;
  }

  return (
    <Section title="Managed">
      <Suspense fallback="Loading managed groups...">
        <ManagedGroupsTable groups={managedGroups} />
      </Suspense>
    </Section>
  );
}
