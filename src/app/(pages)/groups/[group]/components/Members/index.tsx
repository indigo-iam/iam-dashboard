import { Group } from "@/models/groups";
import { fetchGroupMembersPage } from "@/services/groups";
import MembersTable from "./Table";
import AddMemberButton from "./AddButton";

type ManagersProps = {
  group: Group;
};

export default async function Managers(props: Readonly<ManagersProps>) {
  const { group } = props;
  // TODO: pagination
  const members = (await fetchGroupMembersPage(group.id)).Resources;
  return (
    <>
      <MembersTable group={group} members={members} />
      <AddMemberButton group={group} />
    </>
  );
}
