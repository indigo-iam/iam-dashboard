import InfoTable from "@/components/InfoTable";
import { SSHKey } from "@/models/indigo-user";
import { User } from "@/models/scim";
import DeleteSSHKeyButton from "./DeleteButton";

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
    return <p>No SSH keys found.</p>;
  }

  const data = sshKeys.map(sshKey => {
    return {
      key: sshKey,
      data: [
        {
          name: "Label",
          value: sshKey.display,
        },
        {
          name: "Fingerprint",
          value: sshKey.fingerprint,
        },
      ],
    };
  });

  const InfoList = () =>
    data.map(d => {
      return (
        <section key={d.key.value} className="mt-2">
          <div className="flex flex-row">
            <InfoTable data={d.data} className="grow truncate" />
            <DeleteSSHKeyButton user={user} sshKey={d.key} />
          </div>
          <hr className="mt-2" />
        </section>
      );
    });
  return <InfoList />;
}
