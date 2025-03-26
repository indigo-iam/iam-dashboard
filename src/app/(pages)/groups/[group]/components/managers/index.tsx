// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Group } from "@/models/groups";
import { fetchGroupManagers } from "@/services/groups";
import ManagersTable from "./table/table";
import AssignGroupManagerButton from "./assign-button";
import { Section } from "@/components/layout";
import { auth } from "@/auth";

type ManagersProps = {
  group: Group;
};

export default async function Managers(props: Readonly<ManagersProps>) {
  const { group } = props;
  const session = await auth();
  const isAdmin = session?.is_admin ?? false;

  if (!isAdmin) {
    return null;
  }

  const managers = await fetchGroupManagers(group.id);

  return (
    <Section title="Managers">
      <ManagersTable group={group} managers={managers} />
      <AssignGroupManagerButton group={group} />
    </Section>
  );
}
