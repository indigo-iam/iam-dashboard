// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { TabPanel } from "@/components/tabs";
import { OidcAccounts } from "./oidc";
import { SamlAccounts } from "./saml";
import { Certificates } from "./certificates";
import { SSHKeys } from "./ssh-keys";

type LinkedAccountsProps = {
  user: User;
};

export async function LinkedAccounts(props: Readonly<LinkedAccountsProps>) {
  const { user } = props;
  return (
    <TabPanel className="space-y-6">
      <OidcAccounts user={user} />
      <SamlAccounts user={user} />
      <Certificates user={user} />
      <SSHKeys user={user} />
    </TabPanel>
  );
}
