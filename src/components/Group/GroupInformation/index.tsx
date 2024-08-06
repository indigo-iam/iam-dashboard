import { Group } from "@/models/groups";
import { Subsection } from "@/components/Section";
import { dateToHuman } from "@/utils/dates";

type GroupInformationProps = {
  group: Group;
};
export default function GroupInformation(
  props: Readonly<GroupInformationProps>
) {
  const { group } = props;
  return (
    <>
      <Subsection title="Group Name">{group.displayName}</Subsection>
      <Subsection title="Group Description">
        {group["urn:indigo-dc:scim:schemas:IndigoGroup"].description ??
          "No description."}
      </Subsection>
      <Subsection title="Created">
        {group.meta.created ? dateToHuman(new Date(group.meta.created)) : "N/A"}
      </Subsection>
    </>
  );
}
