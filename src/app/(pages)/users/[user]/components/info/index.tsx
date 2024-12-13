import OptionsDropdown from "./dropdown";
import { User } from "@/models/scim";
import { dateToHuman } from "@/utils/dates";
import InfoTable from "@/components/info-table";
import { Section } from "@/components/layout";
import { auth } from "@/auth";

const ActiveStatus = (props: { active: boolean }) => {
  const { active } = props;
  const status = active ? "active" : "disabled";
  return (
    <small
      title={`${active ? "Active" : "Disabled"}`}
      className="data-[status=disabled] inline rounded-full bg-danger p-1 px-2 text-secondary data-[status=active]:bg-success"
      data-status={status}
    >
      {status}
    </small>
  );
};

type UserInfoProps = {
  user: User;
  isMe?: boolean;
};
export default async function UserInfo(props: Readonly<UserInfoProps>) {
  const { user, isMe } = props;
  const session = await auth();
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
    <Section title="General">
      <div className="flex">
        <InfoTable data={data} />
        <div className="mb-auto ml-auto mr-0 mt-0">
          <OptionsDropdown
            user={user}
            isAdmin={session?.is_admin}
            isMe={isMe}
          />
        </div>
      </div>
    </Section>
  );
}
