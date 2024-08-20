import { ScimUser } from "@/models/scim";
import GroupsTable from "./Table";
import JoinGroupButton from "./JoinGroupButton";

type GroupsProps = {
  user: ScimUser;
  isAdmin?: boolean;
};

export const Groups = (props: Readonly<GroupsProps>): JSX.Element => {
  const { user, isAdmin } = props;

  return (
    <>
      <GroupsTable user={user} />
      <JoinGroupButton user={user} isAdmin={isAdmin} />
    </>
  );
};
