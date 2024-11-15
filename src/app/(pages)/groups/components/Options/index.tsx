import Options from "@/components/Options";
import { Group } from "@/models/groups";
import AddSubgroupButton from "./AddSubgroupButton";
import DeleteGroupButton from "./DeleteGroupButton";

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
