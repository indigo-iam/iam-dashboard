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
    <div className="flex items-center">
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
        {/* Safari/WebKit (bug 326820) misplaces popovers positioned through CSS
            anchor positioning (position-area) once the page scrolls, because the
            trigger button lives in the fixed header. The panel is therefore
            placed with static viewport coordinates: it keeps `position: fixed`
            (the only mode WebKit pins to the viewport) and anchoring is
            disabled. `!` is required to override the base PopoverPanel classes
            (`inset-auto`, `[position-area:bottom]`). Coordinates: top = header
            content padding (py-2: 0.5rem) + button (size-8: 2rem) + 0.5rem
            gap = 3rem; right mirrors the header padding (px-4 / md:px-8). Keep
            in sync with the header in src/app/components/header/index.tsx.
            Once WebKit ships a fix for bug 326820 this can be reverted to
            positionArea="bottom". */}
        <PopoverPanel
          className="min-w-48 p-4 [position-area:none]! top-12! right-4! md:right-8!"
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
