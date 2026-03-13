// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ToggleDrawerButton } from "@/components/drawer/toggle-drawer-button";
import Notifications from "@/components/notifications";
import { UserPopover } from "./user-popover";

type HeaderProps = {
  hasRoleAdmin?: boolean;
  isAdmin?: boolean;
};

export async function Header(props: Readonly<HeaderProps>) {
  const { hasRoleAdmin, isAdmin } = props;
  return (
    <header className="t-0 text-secondary sticky top-0 z-50 flex h-14 justify-between border-b border-b-gray-400 bg-sky-900 px-4 py-2 md:px-8 dark:bg-sky-900/75">
      <div className="flex gap-2">
        <ToggleDrawerButton />
        <h2 className="my-auto text-xl font-light">
          IAM for <b className="font-bold">cnafsd</b>
        </h2>
      </div>
      <div className="flex items-center gap-4">
        {hasRoleAdmin && (
          <Notifications
            className="hidden data-[visible=true]:block"
            data-visible={isAdmin && hasRoleAdmin}
          />
        )}
        <UserPopover hasRoleAdmin={hasRoleAdmin} isAdmin={isAdmin} />
      </div>
    </header>
  );
}
