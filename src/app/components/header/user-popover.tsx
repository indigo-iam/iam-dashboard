// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useId } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import { Gravatar } from "@/components/gravatar";
import { AdminModeButton, UserModeButton } from "./admin-user-buttons";
import { SignoutButton } from "./signout-button";
import { User } from "@/models/scim";
import { useDisabled } from "@/utils/hooks";

type UserPopoverProps = {
  hasRoleAdmin?: boolean;
  isAdmin?: boolean;
  user: User;
};

export function UserPopover(props: Readonly<UserPopoverProps>) {
  const { hasRoleAdmin, isAdmin, user } = props;
  const disabled = useDisabled();
  const email = user.emails?.[0].value;
  const tooltipId = useId();
  const extraProps = {
    autoComplete: "off", // https://github.com/vercel/next.js/issues/35558
  };
  return (
    <Popover className="relative size-8">
      <PopoverButton
        className="group static hover:cursor-pointer"
        aria-labelledby={tooltipId}
        data-testid="user-menu-btn"
        disabled={disabled}
        {...extraProps}
      >
        <Gravatar email={email} />
        <div
          role="tooltip"
          className="tooltip top-10 -left-1/2 whitespace-nowrap"
          id={tooltipId}
        >
          Open user menu
        </div>
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom end"
        id="user-popover-menu"
        data-testid="user-menu"
        unmount={false}
        className="items overlay flex w-56 flex-col overflow-hidden ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
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
  );
}
