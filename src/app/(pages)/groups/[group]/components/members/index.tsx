import { Group } from "@/models/groups";
import { fetchGroupMembersPage } from "@/services/groups";
import MembersTable from "./table";
import AddMemberButton from "./add-button";

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
