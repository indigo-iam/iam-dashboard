// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Popover, PopoverButton, PopoverPanel } from "@/components/popover";
import { User } from "@/models/scim";
import { useDisabled } from "@/utils/hooks";
import { AdminModeButton, UserModeButton } from "./admin-user-buttons";
import { SignoutButton } from "./signout-button";

type UserPopoverProps = {
  hasRoleAdmin?: boolean;
  isAdmin?: boolean;
  user: User;
  avatar: React.ReactNode;
};

export function UserPopover(props: Readonly<UserPopoverProps>) {
  const { hasRoleAdmin, isAdmin, user, avatar } = props;
  const disabled = useDisabled();
  return (
    <div className="flex items-center">
      <Popover data-testid="user-menu">
        <PopoverButton
          variant="plain"
          className="group static size-8 cursor-pointer text-nowrap"
          data-testid="user-menu-btn"
          disabled={disabled}
          name="Open user menu"
        >
          {avatar}
        </PopoverButton>
        <PopoverPanel
          className="min-w-48 p-4 [position-area:none]! top-12! right-4! md:right-8!"
          aria-label="User menu"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 pb-2">
              {avatar}
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
