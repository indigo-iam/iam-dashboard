// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Gravatar } from "@/components/gravatar";
import { Popover, PopoverButton, PopoverPanel } from "@/components/popover";
import { User } from "@/models/scim";
import { useDisabled } from "@/utils/hooks";
import { AdminModeButton, UserModeButton } from "./admin-user-buttons";
import { SignoutButton } from "./signout-button";

type UserPopoverProps = {
  hasRoleAdmin?: boolean;
  isAdmin?: boolean;
  user: User;
};

export function UserPopover(props: Readonly<UserPopoverProps>) {
  const { hasRoleAdmin, isAdmin, user } = props;
  const disabled = useDisabled();
  const email = user.emails?.[0].value;
  return (
    <div className="relative flex items-center">
      <Popover data-testid="user-menu">
        <PopoverButton
          variant="plain"
          className="group static size-8 cursor-pointer text-nowrap"
          data-testid="user-menu-btn"
          disabled={disabled}
          name="Open user menu"
        >
          <Gravatar email={email} />
        </PopoverButton>
        <PopoverPanel
          className="mx-4 my-2 min-w-48 p-4"
          positionArea="bottom"
          aria-label="User menu"
        >
          <div className="space-y-2">
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
    </div>
  );
}
