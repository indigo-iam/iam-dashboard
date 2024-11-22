import { User } from "@/models/scim";
import AttributesTable from "./Table";
import AddAttributeButton from "./AddButton";
import { Section } from "@/components/Layout";

type AttributesProps = {
  user: User;
};

export default function Attributes(props: Readonly<AttributesProps>) {
  const { user } = props;
  return (
    <Section title="Attributes">
      <AttributesTable user={user} />
      <AddAttributeButton user={user} />
    </Section>
  );
}
