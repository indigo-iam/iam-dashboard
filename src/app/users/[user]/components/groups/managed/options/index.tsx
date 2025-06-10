// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Options from "@/components/options";
import { ScimReference } from "@/models/scim";
import AddSubgroupButton from "./add-subgroup-button";
import DeleteGroupButton from "./delete-group-button";

export type GroupOptionsProps = {
  groupRef: ScimReference;
};

export default function GroupOptions(props: Readonly<GroupOptionsProps>) {
  const { groupRef } = props;
  return (
    <Options>
      <AddSubgroupButton rootGroup={groupRef} />
      <DeleteGroupButton group={groupRef} />
    </Options>
  );
}
