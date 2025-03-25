import { SSHKey } from "@/models/indigo-user";
import { User } from "@/models/scim";
import SSHKeysOptions from "./options";
import { dateToHuman } from "@/utils/dates";

function SSHKeyView(props: Readonly<{ user: User; sshKey: SSHKey }>) {
  const { user, sshKey } = props;
  const createdAt = sshKey.created
    ? dateToHuman(new Date(sshKey.created!))
    : undefined;
  return (
    <li className="iam-link-list flex flex-row overflow-hidden">
      <div className="my-auto flex grow flex-col gap-1 truncate">
        <p className="iam-text-normal text-lg">{sshKey.display}</p>
        <small
          className="iam-text-light truncate text-sm"
          title={sshKey.fingerprint}
        >
          {sshKey.fingerprint}
        </small>
      </div>
      <div className="iam-text-light my-auto hidden px-2 text-sm sm:flex">
        Created {createdAt}
      </div>
      <SSHKeysOptions user={user} sshKey={sshKey} />
    </li>
  );
}

type TableProps = {
  user: User;
};

export default function Table(props: Readonly<TableProps>) {
  const { user } = props;

  const indigoUser = user["urn:indigo-dc:scim:schemas:IndigoUser"];
  let sshKeys: SSHKey[] = [];

  if (indigoUser?.sshKeys) {
    sshKeys = indigoUser.sshKeys;
  }

  if (sshKeys.length === 0) {
    return <p className="iam-text-light">No SSH keys found.</p>;
  }
  return (
    <ul className="w-full">
      {sshKeys.map(key => (
        <SSHKeyView key={key.fingerprint} user={user} sshKey={key} />
      ))}
    </ul>
  );
}
