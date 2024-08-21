import { ScimUser } from "@/models/scim";
import Table from "./Table";
import AddSSHKeyButton from "./AddButton";

type SSHKeysProps = {
  user: ScimUser;
};

export default function SSHKeys(props: Readonly<SSHKeysProps>) {
  const { user } = props;

  return (
    <>
      <Table user={user} />
      <AddSSHKeyButton user={user} />
    </>
  );
}
