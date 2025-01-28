import { Group } from "@/models/groups";
import SubgroupsTable from "./table";
import { Section } from "@/components/layout";

type SubgroupsProps = {
  group: Group;
};

export default function Subgroups(props: Readonly<SubgroupsProps>) {
  const { group } = props;
  return (
    <Section title="Subgroups">
      <SubgroupsTable group={group} />
    </Section>
  );
}
