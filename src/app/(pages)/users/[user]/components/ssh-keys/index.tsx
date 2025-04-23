// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { Section } from "@/components/layout";
import { TabPanel } from "@/components/tabs";
import AddSSHKeyButton from "./add-button";
import Table from "./table";

type SSHKeysProps = {
  user: User;
};

export function SSHKeys(props: Readonly<SSHKeysProps>) {
  const { user } = props;

  return (
    <TabPanel>
      <Section title="SSH Keys">
        <Table user={user} />
        <AddSSHKeyButton user={user} />
      </Section>
    </TabPanel>
  );
}
