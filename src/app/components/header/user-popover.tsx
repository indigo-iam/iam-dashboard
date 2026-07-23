// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useEffect, useId, useRef } from "react";

import { Gravatar } from "@/components/gravatar";
import { Button } from "@/components/buttons";
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
  const ref = useRef<HTMLDivElement>(null);

  const disabled = useDisabled();
  const email = user.emails?.[0].value;
  const tooltipId = useId();

  function handleInternalClick(event: MouseEvent) {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (target.tagName === "BUTTON") {
      target?.click();
      ref.current?.hidePopover();
    }
  }

  useEffect(() => {
    const popover = ref.current;
    if (!popover) {
      return;
    }
    popover.addEventListener("mousedown", handleInternalClick);
    return () => {
      popover.removeEventListener("mousedown", handleInternalClick);
    };
  }, []);

  return (
    <div className="relative flex items-center">
      <Button
        className="group static size-8 cursor-pointer"
        aria-labelledby={tooltipId}
        data-testid="user-menu-btn"
        disabled={disabled}
        type="button"
        popoverTarget="user-popover-menu"
      >
        <Gravatar email={email} />
        <div
          role="tooltip"
          className="tooltip top-10 -left-1/2 whitespace-nowrap"
          id={tooltipId}
        >
          Open user menu
        </div>
      </Button>
      <div
        id="user-popover-menu"
        data-testid="user-menu"
        aria-label="User menu"
        className="overlay fixed mt-12 mr-4 ml-auto w-56 flex-col opacity-0 transition-all transition-discrete ease-in-out [&:popover-open]:opacity-100 [&:popover-open]:starting:opacity-0"
        popover="auto"
        ref={ref}
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
      </div>
    </div>
  );
}
