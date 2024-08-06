import { ScimUser } from "@/models/scim";
import OptionsDropdown from "./OptionsDropdown";

type RowProps = {
  title: string;
  value: string;
};
function Row(props: Readonly<RowProps>) {
  const { title, value } = props;
  return (
    <tr className="!h-0 !bg-secondary text-sm">
      <td className="!py-0.5">
        <b>{title}</b>
      </td>
      <td className="!py-0.5">{value}</td>
    </tr>
  );
}

type UserInfoProps = {
  user: ScimUser;
};
export default function UserInfo(props: Readonly<UserInfoProps>) {
  const { user } = props;
  return (
    <div className="flex">
      <table className="table-auto border-0">
        <tbody>
          <Row title="Username" value={user.displayName ?? "N/A"} />
          <Row title="User ID" value={user.id ?? "N/A"} />
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
      <div className="mb-auto ml-auto mr-0 mt-0">
        <OptionsDropdown />
      </div>
    </div>
  );
}
