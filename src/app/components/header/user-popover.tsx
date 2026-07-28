// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useEffect, useRef } from "react";

import { Gravatar } from "@/components/gravatar";
import { Button } from "@/components/buttons";
import { User } from "@/models/scim";
import { useDisabled } from "@/utils/hooks";
import { AdminModeButton, UserModeButton } from "./admin-user-buttons";
import { SignoutButton } from "./signout-button";
import { Tooltip, useTooltip } from "@/components/tooltip";

type UserPopoverProps = {
  hasRoleAdmin?: boolean;
  isAdmin?: boolean;
  user: User;
};

export function UserPopover(props: Readonly<UserPopoverProps>) {
  const { hasRoleAdmin, isAdmin, user } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { tooltipId, tooltipRef } = useTooltip(buttonRef);
  const disabled = useDisabled();
  const email = user.emails?.[0].value;

  function handleInternalClick(event: MouseEvent) {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (target.tagName === "BUTTON") {
      target?.click();
      popoverRef.current?.hidePopover();
    }
  }

  useEffect(() => {
    const popover = popoverRef.current;
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
        ref={buttonRef}
      >
        <Gravatar email={email} />
        <Tooltip tooltipId={tooltipId} tooltipRef={tooltipRef}>
          <p className="whitespace-nowrap">Open user menu</p>
        </Tooltip>
      </Button>
      <div
        id="user-popover-menu"
        data-testid="user-menu"
        aria-label="User menu"
        className="overlay fixed mt-12 mr-4 ml-auto w-56 flex-col opacity-0 transition-all transition-discrete ease-in-out [&:popover-open]:opacity-100 [&:popover-open]:starting:opacity-0"
        popover="auto"
        ref={popoverRef}
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
