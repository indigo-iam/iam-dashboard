import { Group } from "@/models/groups";
import { fetchGroupManagers } from "@/services/groups";
import ManagersTable from "./ManagersTable";

type ManagersProps = {
  group: Group;
};

export default async function Managers(props: Readonly<ManagersProps>) {
  const { group } = props;
  const managers = await fetchGroupManagers(group.id);

  if (managers.length === 0) {
    return <>This group has no managers.</>;
  }

  return (
    <>
      <ManagersTable group={group} managers={managers} />
    </>
  );
}
