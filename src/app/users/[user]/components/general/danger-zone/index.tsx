// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { SetAdminPrivileges } from "./admin-privileges";
import { DeleteUser } from "./delete-user";
import { EditExpirationDate } from "./expiration-date";
import { ToggleStatusButton } from "./toggle-user-status";

type DangerZoneProps = {
  user: User;
};

export function DangerZone(props: Readonly<DangerZoneProps>) {
  const { user } = props;
  return (
    <div className="border-light-gray flex flex-col gap-8 border-t py-4 lg:flex-row">
      <div className="flex w-full flex-col text-sm font-light lg:w-1/3">
        <span className="text-danger dark:text-danger-light font-semibold">
          Danger zone
        </span>
        <p className="text-extralight dark:text-light-gray/80">
          A disabled user cannot login and their Access Tokens and Refresh
          Tokens are immediately revoked.
        </p>
      </div>
      <div className="w-full space-y-4 lg:w-2/3">
        <div className="flex flex-wrap gap-4">
          <EditExpirationDate user={user} />
          <SetAdminPrivileges user={user} />
        </div>
        <div className="flex items-center justify-end gap-4">
          <ToggleStatusButton user={user} />
          <DeleteUser user={user} />
        </div>
      </div>
    </div>
  );
}
