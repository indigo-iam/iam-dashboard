import Options from "@/components/options";
import { Group } from "@/models/groups";
import AddSubgroupButton from "./add-subgroup-button";
import DeleteGroupButton from "./delete-group-button";

export type GroupOptionsProps = {
  group: Group;
};

export default function GroupOptions(props: Readonly<GroupOptionsProps>) {
  const { group } = props;
  return (
    <Options>
      <AddSubgroupButton rootGroup={group} />
      <DeleteGroupButton group={group} />
    </Options>
  );
}
