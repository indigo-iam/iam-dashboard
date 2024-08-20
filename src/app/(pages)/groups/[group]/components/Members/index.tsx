import { Group } from "@/models/groups";
import { fetchGroupManagers, fetchGroupMembersPage } from "@/services/groups";
import MembersTable from "./MembersTable";
import AddMemberButton from "./AddMemberButton";

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
