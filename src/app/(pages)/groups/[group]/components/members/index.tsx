import { Group } from "@/models/groups";
import { fetchGroupMembersPage } from "@/services/groups";
import MembersTable from "./table";
import AddMemberButton from "./add-button";
import { Section } from "@/components/layout";

type MembersProps = {
  group: Group;
};

export default async function Members(props: Readonly<MembersProps>) {
  const { group } = props;
  // TODO: pagination
  const members = (await fetchGroupMembersPage(group.id)).Resources;
  return (
    <Section title="Members">
      <MembersTable group={group} members={members} />
      <AddMemberButton group={group} />
    </Section>
  );
}
