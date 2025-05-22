// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { changeUserStatus } from "@/services/users";
import { User } from "@/models/scim";

function EnableUserButton(props: Readonly<{ user: User }>) {
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

function DisableUserButton(props: Readonly<{ user: User }>) {
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

type SetUserStatusProps = {
  user: User;
};

export function SetUserStatus(props: Readonly<SetUserStatusProps>) {
  const { user } = props;
  return user.active ? (
    <DisableUserButton user={user} />
  ) : (
    <EnableUserButton user={user} />
  );
}
