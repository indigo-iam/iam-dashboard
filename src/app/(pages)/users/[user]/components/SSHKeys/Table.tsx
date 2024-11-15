import InfoTable from "@/components/InfoTable";
import { SSHKey } from "@/models/indigo-user";
import { User } from "@/models/scim";
import SSHKeysOptions from "./Options";

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

  return (
    <table className="w-full table-auto">
      <tbody>
        {data.map(d => (
          <tr key={d.key.value}>
            <td className="tbl-td">
              <InfoTable data={d.data} className="grow truncate" />
            </td>
            <td className="tbl-td w-1/12 text-center">
              <SSHKeysOptions user={user} sshKey={d.key} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
