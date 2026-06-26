// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { SSHKey } from "@/models/indigo-user";
import AddSSHKeyButton from "./add-button";
import Table from "./table";

type SSHKeysProps = {
  userId: string;
  userFormattedName: string;
  sshKeys: SSHKey[];
};

export async function SSHKeys(props: Readonly<SSHKeysProps>) {
  const { userId, userFormattedName, sshKeys } = props;
  return (
    <div className="panel space-y-2">
      <h2>SSH Keys</h2>
      <Table
        userId={userId}
        userFormattedName={userFormattedName}
        sshKeys={sshKeys}
      />
      <AddSSHKeyButton userId={userId} />
    </div>
  );
}
