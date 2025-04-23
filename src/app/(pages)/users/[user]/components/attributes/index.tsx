// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { Section } from "@/components/layout";
import { TabPanel } from "@/components/tabs";
import AttributesTable from "./table";
import AddAttributeButton from "./add-button";

type AttributesProps = {
  user: User;
};

export function Attributes(props: Readonly<AttributesProps>) {
  const { user } = props;
  return (
    <TabPanel>
      <Section title="Attributes">
        <AttributesTable user={user} />
        <AddAttributeButton user={user} />
      </Section>
    </TabPanel>
  );
}
