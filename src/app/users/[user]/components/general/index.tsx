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
  mfaEnabled: boolean;
};

export async function General(props: Readonly<GeneralProps>) {
  const { user, isMe, mfaEnabled } = props;
  return (
    <TabPanel className="panel divide-y">
      <UserDetailsForm user={user} isMe={isMe} mfaEnabled={mfaEnabled} />
      <Aup user={user} isMe={isMe} />
      {!isMe && <DangerZone user={user} />}
    </TabPanel>
  );
}
