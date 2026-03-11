// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { AdminModeSwitch } from "@/app/components/admin-mode-switch";
import { ToggleDrawerButton } from "@/components/drawer/toggle-drawer-button";
import { Gravatar } from "@/components/gravatar";
import Notifications from "@/components/notifications";

type HeaderProps = {
  hasRoleAdmin?: boolean;
  isAdmin?: boolean;
  email?: string;
};

export async function Header(props: Readonly<HeaderProps>) {
  const { hasRoleAdmin, isAdmin, email } = props;
  return (
    <header className="t-0 text-secondary sticky top-0 z-50 flex justify-between border-b border-b-gray-400 bg-sky-900 px-4 py-2 md:px-8 dark:bg-sky-900/75">
      <div className="flex gap-2">
        <ToggleDrawerButton />
        <h2 className="my-auto text-xl font-light">
          IAM for
          <span className="font-bold"> cnafsd</span>
        </h2>
      </div>
      <div className="flex items-center gap-2">
        {hasRoleAdmin && (
          <>
            <AdminModeSwitch defaultChecked={isAdmin} />
            <Notifications
              className="hidden data-[visible=true]:block"
              data-visible={isAdmin && hasRoleAdmin}
            />
            <div className="size-8">
              <Gravatar email={email} />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
