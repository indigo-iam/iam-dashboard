// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Options from "@/components/options";
import { User } from "@/models/scim";
import DeleteUserButton from "./delete-user-button";
import ToggleUserStatus from "./toggle-user-status";

type UserOptions = {
  user: User;
};

export default function UserOptions(props: Readonly<UserOptions>) {
  const { user } = props;
  return (
    <Options>
      <ToggleUserStatus user={user} />
      <DeleteUserButton user={user} />
    </Options>
  );
}
