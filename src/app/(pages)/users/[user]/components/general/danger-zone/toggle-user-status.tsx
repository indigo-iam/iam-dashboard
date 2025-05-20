// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: Apache-2.0

import { Button } from "@/components/buttons";
import { User } from "@/models/scim";
import { changeUserStatus } from "@/services/users";

export function EnableUserButton(props: Readonly<{ user: User }>) {
  const { user } = props;
  const action = async () => {
    "use server";
    await changeUserStatus(user.id, true);
  };
  return (
    <form action={action}>
      <Button className="btn-secondary" type="submit">
        Enable user
      </Button>
    </form>
  );
}

export function DisableUserButton(props: Readonly<{ user: User }>) {
  const { user } = props;
  const action = async () => {
    "use server";
    await changeUserStatus(user.id, false);
  };
  return (
    <form action={action}>
      <Button className="btn-danger-secondary" type="submit">
        Disable user
      </Button>
    </form>
  );
}
