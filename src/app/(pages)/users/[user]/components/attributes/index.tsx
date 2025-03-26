// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import AttributesTable from "./table";
import AddAttributeButton from "./add-button";
import { Section } from "@/components/layout";

type AttributesProps = {
  user: User;
};

export default function Attributes(props: Readonly<AttributesProps>) {
  const { user } = props;
  return (
    <Section title="Attributes">
      <AttributesTable user={user} />
      <AddAttributeButton user={user} />
    </Section>
  );
}
