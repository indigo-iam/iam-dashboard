// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Info } from "@/components/info";
import { RoleCheckbox } from "./assign-role-checkbox";
import { DeleteUser } from "./delete-user";
import { EditEndtime } from "./edit-end-time";
import { ServiceAccountCheckbox } from "./service-account-checkbox";
import { ToggleStatusButton } from "./toggle-user-status";

type DangerZoneProps = {
  userId: string;
  userName: string;
  userFormattedName: string;
  userEmail: string;
  userIsActive: boolean;
  userIsServiceAccount: boolean;
  userEndtime?: string;
  userAuthorities: string[];
  isAdmin: boolean;
};

export function DangerZone(props: Readonly<DangerZoneProps>) {
  const {
    userId,
    userName,
    userFormattedName,
    userEmail,
    userIsActive,
    userIsServiceAccount,
    userEndtime,
    userAuthorities,
  } = props;
  const authorities = new Set<string>(userAuthorities);
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
          <p>
            Delete the user to completely remove them from the organization.
          </p>
        </div>
      </div>
      <div className="w-full space-y-4 lg:w-2/3">
        <EditEndtime
          userId={userId}
          userFormattedName={userFormattedName}
          userEndtime={userEndtime}
        />
        <div className="space-y-1">
          <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-100">
            Privileges
          </h5>
          <div className="flex items-center gap-1">
            <RoleCheckbox
              userId={userId}
              userFormattedName={userFormattedName}
              role="ROLE_ADMIN"
              hasRole={authorities.has("ROLE_ADMIN")}
            />
            <Info anchor="left">
              A user with <b>admin</b> role can create, delete and modify user,
              groups and client. Admins can also assign restricted scopes to
              clients.
            </Info>
          </div>
          <div className="flex items-center gap-1">
            <RoleCheckbox
              userId={userId}
              userFormattedName={userFormattedName}
              role="ROLE_READER"
              hasRole={authorities.has("ROLE_READER")}
            />
            <Info anchor="left">
              Grants <b>read-only</b> access to authorized resources, allowing
              users to view information without modifying it.
            </Info>
          </div>
        </div>
        <div className="space-y-1">
          <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-100">
            Other settings
          </h5>
          <div className="flex items-center gap-1">
            <ServiceAccountCheckbox
              userId={userId}
              userFormattedName={userFormattedName}
              enabled={userIsServiceAccount}
            />
            <Info anchor="left">
              A service account is a <b>non-human</b> identity used by
              applications to securely access protected resources through IAM
              managed credentials and permissions.
            </Info>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <ToggleStatusButton
            userId={userId}
            userFormattedName={userFormattedName}
            userEmail={userEmail}
            userIsActive={userIsActive}
          />
          <DeleteUser
            userId={userId}
            userName={userName}
            userFormattedName={userFormattedName}
          />
        </div>
      </div>
    </div>
  );
}
