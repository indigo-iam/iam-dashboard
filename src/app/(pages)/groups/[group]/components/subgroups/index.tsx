// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Group } from "@/models/groups";
import SubgroupsTable from "./table";
import { Section } from "@/components/layout";

type SubgroupsProps = {
  group: Group;
};

export default function Subgroups(props: Readonly<SubgroupsProps>) {
  const { group } = props;
  return (
    <Section title="Subgroups">
      <SubgroupsTable group={group} />
    </Section>
  );
}
