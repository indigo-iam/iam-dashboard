// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Options from "@/components/options";
import AddSubgroupButton from "./add-subgroup-button";
import DeleteGroupButton from "./delete-group-button";
import { Group } from "@/models/groups";

export type GroupOptionsProps = {
  group: Group;
};

export default function GroupOptions(props: Readonly<GroupOptionsProps>) {
  const { group } = props;
  return (
    <Options>
      <AddSubgroupButton rootGroup={group} />
      <DeleteGroupButton group={group} />
    </Options>
  );
}
