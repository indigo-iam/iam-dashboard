import { User } from "@/models/scim";
import { Section } from "@/components/layout";
import GroupsTable from "./table";
import JoinGroupButton from "./join-group-button";

type GroupsProps = {
  user: User;
  isAdmin?: boolean;
};

export default function Groups(props: Readonly<GroupsProps>) {
  const { user, isAdmin } = props;

  return (
    <Section title="Groups">
      <GroupsTable user={user} />
      <JoinGroupButton user={user} isAdmin={isAdmin} />
    </Section>
  );
}
