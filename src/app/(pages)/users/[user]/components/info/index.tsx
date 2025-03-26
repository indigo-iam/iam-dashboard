// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import OptionsDropdown from "./dropdown";
import { User } from "@/models/scim";
import { dateToHuman } from "@/utils/dates";
import InfoTable from "@/components/info-table";
import { Section } from "@/components/layout";
import { auth } from "@/auth";
import { Status } from "@/components/badges";

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
    { name: "Status", value: <Status active={user.active ?? false} /> },
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
