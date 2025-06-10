// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Options from "@/components/options";
import { User } from "@/models/scim";
import { Group } from "@/models/groups";
import RevokeManagerButton from "./revoke-button";

type ManagerOptionsProps = {
  manager: User;
  group: Group;
};

export default function ManagerOptions(props: Readonly<ManagerOptionsProps>) {
  const { manager, group } = props;
  return (
    <Options>
      <RevokeManagerButton user={manager} group={group} />
    </Options>
  );
}
