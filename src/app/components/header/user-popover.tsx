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
    <Popover>
      <PopoverButton className="flex items-center hover:cursor-pointer">
        <Gravatar email={email} />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom end"
        className="items text-light flex w-56 flex-col overflow-hidden rounded-xl bg-white p-4 text-sm/6 shadow transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0 dark:bg-slate-600"
      >
        <div className="divide-light-gray dark:divide-light-gray/30 space-y-4 divide-y">
          <div className="flex gap-2 pb-2">
            <Gravatar email={email} />
            <div className="flex flex-col leading-normal">
              <span>{user.name?.formatted}</span>
              <b>{user.displayName}</b>
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
