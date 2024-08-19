import { ScimUser } from "@/models/scim";
import OptionsDropdown from "./OptionsDropdown";
import { dateToHuman } from "@/utils/dates";
import InfoTable from "@/components/InfoTable";

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

  const data = [
    { name: "Username", value: user.displayName ?? "N/A" },
    { name: "User ID", value: user.id ?? "N/A" },
    { name: "Email", value: user.emails?.[0].value ?? "N/A" },
    { name: "Status", value: user.active ? "Active" : "Inactive" },
    { name: "Created", value: created },
    { name: "Last Modified", value: lastModified },
    { name: "Signed AUP", value: signedAup },
  ];

  return (
    <div className="flex">
      <InfoTable data={data} />
      <div className="mb-auto ml-auto mr-0 mt-0">
        <OptionsDropdown />
      </div>
    </div>
  );
}
