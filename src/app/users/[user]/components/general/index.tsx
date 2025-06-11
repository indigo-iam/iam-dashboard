// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { User } from "@/models/scim";
import { Aup } from "./aup";
import { UserDetailsForm } from "./details";
import { DangerZone } from "./danger-zone";

type GeneralProps = {
  user: User;
  isMe: boolean;
};

export async function General(props: Readonly<GeneralProps>) {
  const { user, isMe } = props;
  return (
    <TabPanel className="panel">
      <UserDetailsForm user={user} isMe={isMe} />
      <Aup user={user} isMe={isMe} />
      {isMe ? null : (
        <>
          <hr className="col-span-full text-gray-300" />
          <DangerZone user={user} />
        </>
      )}
    </TabPanel>
  );
}
