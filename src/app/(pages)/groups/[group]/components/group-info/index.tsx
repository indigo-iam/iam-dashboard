import { Group } from "@/models/groups";
import { dateToHuman } from "@/utils/dates";
import InfoTable from "@/components/info-table";
import { Section } from "@/components/layout";

type GroupInfoProps = {
  group: Group;
};
export default function GroupInfo(props: Readonly<GroupInfoProps>) {
  const { group } = props;
  const description =
    group["urn:indigo-dc:scim:schemas:IndigoGroup"].description;
  const created = group.meta.created
    ? dateToHuman(new Date(group.meta.created))
    : "N/A";

  const data = [
    { name: "Group Name", value: group.displayName },
    { name: "Group Description", value: description ?? "No description." },
    { name: "Created", value: created },
  ];
  return (
    <Section title="Group Information">
      <InfoTable data={data} />
    </Section>
  );
}
