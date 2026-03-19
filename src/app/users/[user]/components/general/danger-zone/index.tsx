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
    <div className="flex flex-col gap-8 py-4 lg:flex-row">
      <div className="flex w-full flex-col space-y-2 text-sm font-light lg:w-1/3">
        <h5 className="text-danger dark:text-danger-light font-semibold">
          Danger zone
        </h5>
        <div className="space-y-1">
          <p className="whitespace-normal">
            A disabled user cannot login and tokens are immediately revoked.
          </p>
          <p>Delete the user to completely remove them from he organization.</p>
        </div>
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
