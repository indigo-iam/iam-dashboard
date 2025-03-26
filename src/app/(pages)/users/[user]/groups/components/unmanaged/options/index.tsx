// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Options from "@/components/options";
import { ScimReference, User } from "@/models/scim";
import RemoveMembership from "./remove-membership-button";

export type GroupOptionsProps = {
  user: User;
  groupRef: ScimReference;
};

export default function GroupOptions(props: Readonly<GroupOptionsProps>) {
  const { user, groupRef } = props;
  return (
    <Options>
      <RemoveMembership user={user} groupRef={groupRef} />
    </Options>
  );
}
