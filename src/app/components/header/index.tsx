// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ToggleDrawerButton } from "@/components/drawer/toggle-drawer-button";
import Notifications from "@/components/notifications";
import { UserPopover } from "./user-popover";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type HeaderProps = {
  hasRoleAdmin?: boolean;
  isAdmin?: boolean;
};

export async function Header(props: Readonly<HeaderProps>) {
  const { hasRoleAdmin, isAdmin } = props;
  const organization = "cnafsd";
  return (
    <header className="t-0 dark:bg-sky-980 fixed inset-0 top-0 z-50 flex h-14 border-b border-b-gray-400 bg-sky-900 px-4 py-2 text-white md:px-8">
      <div className="flex grow flex-col truncate">
        <div className="flex grow gap-2">
          <ToggleDrawerButton />
          <h2 className="my-auto truncate text-xl font-light text-white">
            IAM for <b className="text-white">{organization}</b>
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {hasRoleAdmin && (
          <>
            {isAdmin && (
              <p
                className="flex items-center gap-1 rounded bg-orange-50 px-2 py-1 text-xs text-orange-400 dark:bg-orange-400 dark:text-orange-50"
                data-testid="admin-mode-label"
              >
                <ExclamationTriangleIcon className="size-4" />
                <span className="hidden md:inline-block">admin mode</span>
                <span className="inline-block md:hidden">admin</span>
              </p>
            )}
            <Notifications
              className="hidden data-[visible=true]:block"
              data-visible={isAdmin && hasRoleAdmin}
            />
          </>
        )}
        <UserPopover hasRoleAdmin={hasRoleAdmin} isAdmin={isAdmin} />
      </div>
    </header>
  );
}
