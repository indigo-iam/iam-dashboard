import { User } from "@/models/scim";
import { SSHKey } from "@/models/indigo-user";
import Options from "@/components/Options";
import DeleteKey from "./DeleteKey";

type SSHKeysOptionsProps = {
  user: User;
  sshKey: SSHKey;
};

export default function SSHKeysOptions(props: Readonly<SSHKeysOptionsProps>) {
  const { user, sshKey } = props;
  return (
    <Options>
      <DeleteKey user={user} sshKey={sshKey} />
    </Options>
  );
}
