import { ScimUser } from "@/models/scim";
import OptionsDropdown from "./OptionsDropdown";
import { dateToHuman } from "@/utils/dates";

type RowProps = {
  title: string;
  value: string;
};
function Row(props: Readonly<RowProps>) {
  const { title, value } = props;
  return (
    <tr className="!bg-secondary text-sm">
      <td className="min-w-48 p-1">
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
  const created = user.meta?.created
    ? dateToHuman(new Date(user.meta?.created))
    : "N/A";
  const lastModified = user.meta?.lastModified
    ? dateToHuman(new Date(user.meta?.lastModified))
    : "N/A";
  const signedAup = user["urn:indigo-dc:scim:schemas:IndigoUser"]
    ?.aupSignatureTime
    ? dateToHuman(
        new Date(user["urn:indigo-dc:scim:schemas:IndigoUser"].aupSignatureTime)
      )
    : "N/A";
  return (
    <div className="flex">
      <table className="table-auto border-0">
        <tbody>
          <Row title="Username" value={user.displayName ?? "N/A"} />
          <Row title="User ID" value={user.id ?? "N/A"} />
          <Row title="Email" value={user.emails?.[0].value ?? "N/A"} />
          <Row title="Status" value={user.active ? "Active" : "Inactive"} />
          <Row title="Created" value={created} />
          <Row title="Last Modified" value={lastModified} />
          <Row title="Signed AUP" value={signedAup} />
        </tbody>
      </table>
      <div className="mb-auto ml-auto mr-0 mt-0">
        <OptionsDropdown />
      </div>
    </div>
  );
}
