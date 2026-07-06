// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { Certificate, OidcId, SamlId, SSHKey } from "@/models/indigo-user";
import { OidcAccounts } from "./oidc";
import { SamlAccounts } from "./saml";
import { Certificates } from "./certificates";
import { SSHKeys } from "./ssh-keys";

type LinkedAccountsProps = {
  userId: string;
  userName: string;
  userFormattedName: string;
  oidcIds: OidcId[];
  samlIds: SamlId[];
  certificates: Certificate[];
  sshKeys: SSHKey[];
  isAdmin: boolean;
};

export async function LinkedAccounts(props: Readonly<LinkedAccountsProps>) {
  const {
    userId,
    userName,
    userFormattedName,
    oidcIds,
    samlIds,
    certificates,
    sshKeys,
    isAdmin,
  } = props;
  return (
    <TabPanel className="space-y-6">
      <OidcAccounts userId={userId} oidcIds={oidcIds} />
      <SamlAccounts userId={userId} samlIds={samlIds} />
      <Certificates
        userId={userId}
        userName={userName}
        userFormattedName={userFormattedName}
        certificates={certificates}
        isAdmin={isAdmin}
      />
      <SSHKeys userId={userId} sshKeys={sshKeys} />
    </TabPanel>
  );
}
