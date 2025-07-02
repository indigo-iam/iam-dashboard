// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { TabPanel } from "@/components/tabs";
import AddSSHKeyButton from "./add-button";
import Table from "./table";

type SSHKeysProps = {
  user: User;
};

export function SSHKeys(props: Readonly<SSHKeysProps>) {
  const { user } = props;

  return (
    <TabPanel className="panel space-y-2">
      <h2 className="border-b">SSH Keys</h2>
      <Table user={user} />
      <AddSSHKeyButton user={user} />
    </TabPanel>
  );
}
