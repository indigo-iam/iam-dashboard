import { ScimUser } from "@/models/scim";
import AttributesTable from "./Table";
import AddAttributeButton from "./AddButton";

type AttributesProps = {
  user: ScimUser;
};

export default function Attributes(props: Readonly<AttributesProps>) {
  const { user } = props;
  return (
    <>
      <AttributesTable user={user} />
      <AddAttributeButton user={user} />
    </>
  );
}
