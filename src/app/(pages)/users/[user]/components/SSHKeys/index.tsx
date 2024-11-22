import { User } from "@/models/scim";
import Table from "./Table";
import AddSSHKeyButton from "./AddButton";
import { Section } from "@/components/Layout";

type SSHKeysProps = {
  user: User;
};

export default function SSHKeys(props: Readonly<SSHKeysProps>) {
  const { user } = props;

  return (
    <Section title="SSH Keys">
      <Table user={user} />
      <AddSSHKeyButton user={user} />
    </Section>
  );
}
