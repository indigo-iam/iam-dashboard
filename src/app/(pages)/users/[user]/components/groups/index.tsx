import { User } from "@/models/scim";
import { Section } from "@/components/layout";
import GroupsTable from "./table";

type GroupsProps = {
  user: User;
};

export default function Groups(props: Readonly<GroupsProps>) {
  const { user } = props;

  return (
    <Section title="Groups">
      <GroupsTable user={user} />
    </Section>
  );
}
