import { User } from "@/models/scim";
import GroupsTable from "./Table";
import JoinGroupButton from "./JoinGroupButton";
import { Section } from "@/components/Layout";

type GroupsProps = {
  user: User;
  isAdmin?: boolean;
};

export const Groups = (props: Readonly<GroupsProps>): JSX.Element => {
  const { user, isAdmin } = props;

  return (
    <Section title="Groups">
      <GroupsTable user={user} />
      <JoinGroupButton user={user} isAdmin={isAdmin} />
    </Section>
  );
};
