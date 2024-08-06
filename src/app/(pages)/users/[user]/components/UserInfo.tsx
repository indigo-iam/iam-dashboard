import Card from "@/components/Card";
import Panel from "@/components/Panel";
import { ScimUser } from "@/models/scim";

type RowProps = {
  title: string;
  value: string;
};
function Row(props: Readonly<RowProps>) {
  const { title, value } = props;
  return (
    <tr className="!h-0 !bg-secondary !p-0 text-sm">
      <td>
        <b>{title}</b>
      </td>
      <td>{value}</td>
    </tr>
  );
}

type UserInfoProps = {
  user: ScimUser;
};
export default function UserInfo(props: Readonly<UserInfoProps>) {
  const { user } = props;
  return (
    <Panel>
      <table className="table-auto border-0">
        <tbody>
          <Row title="Username" value={user.displayName ?? "N/A"} />
          <Row title="User ID" value={user.id} />
          <Row title="Email" value={user.emails?.[0].value ?? "N/A"} />
          <Row title="Status" value={user.active ? "Active" : "Inactive"} />
          <Row title="Created" value={user.meta?.created ?? "N/A"} />
          <Row title="Last Modified" value={user.meta?.created ?? "N/A"} />
          <Row
            title="Signed AUP"
            value={
              user["urn:indigo-dc:scim:schemas:IndigoUser"]?.aupSignatureTime ??
              "N/A"
            }
          />
        </tbody>
      </table>
    </Panel>
  );
}
