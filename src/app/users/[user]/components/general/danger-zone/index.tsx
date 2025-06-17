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
    <div className="border-light-gray flex flex-row gap-4 border-t py-4">
      <div className="flex grow flex-col text-sm font-light">
        <div className="text-danger">Danger zone</div>
        <div className="text-extralight">
          A disabled user cannot login and their Access Tokens and Refresh
          Tokens are immediately revoked.
        </div>
      </div>
      <div className="w-full lg:w-2/3">
        <div className="flex flex-col justify-between gap-4">
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
    </div>
  );
}
