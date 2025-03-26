// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import Table from "./table";
import AddSSHKeyButton from "./add-button";
import { Section } from "@/components/layout";

type SSHKeysProps = {
  user: User;
};

export default function SSHKeys(props: Readonly<SSHKeysProps>) {
  const { user } = props;

  return (
    <Section title="SSH Keys">
      <Table user={user} />
      <AddSSHKeyButton user={user} />
    </Section>
  );
}
