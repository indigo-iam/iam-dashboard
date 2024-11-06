import { User } from "@/models/scim";
import OptionsDropdown from "./OptionsDropdown";
import { dateToHuman } from "@/utils/dates";
import InfoTable from "@/components/InfoTable";

const ActiveStatus = (props: { active: boolean }) => {
  const { active } = props;
  return (
    <div className="flex">
      <p>{`${active ? "Active" : "Disabled"}`}</p>
      <div
        title={`${active ? "Active" : "Disabled"}`}
        className={`${active ? "bg-success" : "bg-danger"} my-auto ml-2 h-3 w-3 rounded-full`}
      />
    </div>
  );
};

type UserInfoProps = {
  user: User;
};
export default function UserInfo(props: Readonly<UserInfoProps>) {
  const { user } = props;
  const indigoUser = user["urn:indigo-dc:scim:schemas:IndigoUser"];
  const created = user.meta?.created
    ? dateToHuman(new Date(user.meta?.created))
    : "N/A";
  const endTime = indigoUser?.endTime
    ? dateToHuman(new Date(indigoUser.endTime))
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
    { name: "Status", value: <ActiveStatus active={user.active ?? false} /> },
    { name: "Created", value: created },
    { name: "End Time", value: endTime },
    { name: "Last Modified", value: lastModified },
    { name: "Signed AUP", value: signedAup },
  ];

  return (
    <div className="flex">
      <InfoTable data={data} />
      <div className="mb-auto ml-auto mr-0 mt-0">
        <OptionsDropdown user={user} />
      </div>
    </div>
  );
}
