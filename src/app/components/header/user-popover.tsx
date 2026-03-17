// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import { Gravatar } from "@/components/gravatar";
import { fetchMe } from "@/services/me";
import { AdminModeButton, UserModeButton } from "./admin-user-buttons";
import { SignoutButton } from "./signout-button";

type UserPopoverProps = {
  hasRoleAdmin?: boolean;
  isAdmin?: boolean;
};

export async function UserPopover(props: Readonly<UserPopoverProps>) {
  const { hasRoleAdmin, isAdmin } = props;
  const user = await fetchMe();
  const email = user.emails?.[0].value;

  return (
    <Popover className="relative size-8">
      <PopoverButton
        className="hover:cursor-pointer"
        title="Open user menu"
        data-testid="user-menu-btn"
      >
        <Gravatar email={email} />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom end"
        className="items overlay flex w-56 flex-col overflow-hidden ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
      >
        <div className="space-y-2 divide-y divide-gray-200 dark:divide-gray-400">
          <div className="flex items-center gap-2 pb-2">
            <Gravatar email={email} />
            <div className="flex flex-col leading-normal">
              <p>{user.name?.formatted}</p>
              <p>
                <b>{user.displayName}</b>
              </p>
            </div>
          </div>
          <div>
            {hasRoleAdmin &&
              (isAdmin ? <UserModeButton /> : <AdminModeButton />)}
            <SignoutButton />
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
