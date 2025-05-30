// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { SSHKey } from "@/models/indigo-user";
import Options from "@/components/options";
import DeleteButton from "./delete-button";

type SSHKeysOptionsProps = {
  user: User;
  sshKey: SSHKey;
};

export default function SSHKeysOptions(props: Readonly<SSHKeysOptionsProps>) {
  const { user, sshKey } = props;
  return (
    <Options>
      <DeleteButton user={user} sshKey={sshKey} />
    </Options>
  );
}
