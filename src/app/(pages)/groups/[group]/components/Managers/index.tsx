import { Group } from "@/models/groups";
import { fetchGroupManagers } from "@/services/groups";
import ManagersTable from "./Table";
import AssignGroupManagerButton from "./AssignButton";

type ManagersProps = {
  group: Group;
};

export default async function Managers(props: Readonly<ManagersProps>) {
  const { group } = props;
  const managers = await fetchGroupManagers(group.id);
  return (
    <>
      <ManagersTable group={group} managers={managers} />
      <AssignGroupManagerButton group={group} />
    </>
  );
}
