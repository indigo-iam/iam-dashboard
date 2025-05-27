// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { SetUserStatus } from "./user-status";
import { DeleteUser } from "./delete-user";
import { EditExpirationDate } from "./expiration-date";
import { SetAdminPrivileges } from "./admin-privileges";

type DangerZoneProps = {
  user: User;
};

export function DangerZone(props: Readonly<DangerZoneProps>) {
  const { user } = props;
  return (
    <>
      <div className="col-span-full text-sm font-light sm:col-span-2">
        <div className="text-danger py-1">Danger zone</div>
        <div className="text-extralight">
          A disabled user cannot login and their Access Tokens and Refresh
          Tokens are immediately revoked.
        </div>
      </div>
      <div className="col-span-full grow sm:col-span-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex gap-4">
            <EditExpirationDate user={user} />
            <SetAdminPrivileges user={user} />
          </div>
          <div className="flex items-center gap-4">
            <SetUserStatus user={user} />
            <DeleteUser user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
