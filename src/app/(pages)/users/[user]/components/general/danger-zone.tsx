// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { User } from "@/models/scim";

type DangerZoneProps = {
  user: User;
};

export function DangerZone(props: Readonly<DangerZoneProps>) {
  const { user } = props;
  return (
    <>
      <div className="col-span-full text-sm font-light sm:col-span-2">
        <div className="text-light">Danger zone</div>
        <div className="text-extralight">
          A disabled user cannot login and their Access Tokens and Refresh
          Tokens are immediately revoked.
        </div>
      </div>
      <div className="col-span-full grow sm:col-span-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex gap-4">
            <Button className="btn-secondary">Edit expiration date</Button>
            <Button className="btn-secondary">Revoke admin privileges</Button>
          </div>
          <div className="flex gap-4">
            <Button className="btn-danger-secondary">Disable user</Button>
            <Button className="btn-danger">Delete user</Button>
          </div>
        </div>
      </div>
    </>
  );
}
