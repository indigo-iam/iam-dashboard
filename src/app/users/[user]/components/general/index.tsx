// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { Aup } from "./aup";
import { UserDetailsForm } from "./details";
import { DangerZone } from "./danger-zone";

type GeneralProps = {
  userId: string;
  userName: string;
  userFormattedName: string;
  userGivenName: string;
  userFamilyName: string;
  userEmail: string;
  userAupSignatureTime: string | null;
  userCreatedAt?: string;
  userLastModified?: string;
  userEndTime?: string;
  userIsActive: boolean;
  isMe: boolean;
  mfaEnabled: boolean;
  isAdmin: boolean;
};

export async function General(props: Readonly<GeneralProps>) {
  const {
    userId,
    userName,
    userFormattedName,
    userFamilyName,
    userGivenName,
    userEmail,
    userAupSignatureTime,
    userCreatedAt,
    userLastModified,
    userEndTime,
    userIsActive,
    isMe,
    mfaEnabled,
    isAdmin,
  } = props;
  return (
    <TabPanel className="panel divide-y">
      <UserDetailsForm
        isMe={isMe}
        mfaEnabled={mfaEnabled}
        userId={userId}
        userName={userName}
        userGivenName={userGivenName}
        userFamilyName={userFamilyName}
        userEmail={userEmail}
        userCreatedAt={userCreatedAt}
        userLastModified={userLastModified}
        userIsActive={userIsActive}
      />
      <Aup
        isMe={isMe}
        isAdmin={isAdmin}
        userId={userId}
        userFormattedName={userFormattedName}
        userAupSignatureTime={userAupSignatureTime}
      />
      {!isMe && (
        <DangerZone
          userId={userId}
          userName={userName}
          userFormattedName={userFormattedName}
          userEmail={userEmail}
          userIsActive={userIsActive}
          userEndTime={userEndTime}
          isAdmin={isAdmin}
        />
      )}
    </TabPanel>
  );
}
