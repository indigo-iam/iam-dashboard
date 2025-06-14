// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Group } from "@/models/groups";
import SubgroupsTable from "./table";

type SubgroupsProps = {
  group: Group;
};

export default function Subgroups(props: Readonly<SubgroupsProps>) {
  const { group } = props;
  return (
    <div className="panel space-y-4">
      <h2 className="border-b">Subgroups</h2>
      <SubgroupsTable group={group} />
    </div>
  );
}
