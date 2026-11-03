// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useRef } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { PaginatedGroupRequests } from "@/models/group-requests";
import { Registration } from "@/models/registration";
import { Popover, PopoverButton, PopoverPanel } from "../popover";
import { Tooltip, useTooltip } from "../tooltip";

type BadgeProps = {
  count: number;
};

function Badge(props: Readonly<BadgeProps>) {
  const { count } = props;
  if (count === 0) {
    return null;
  }
  return (
    <div className="relative -top-5 right-3">
      <div className="bg-danger absolute z-30 inline-flex size-5 items-center justify-center rounded-full p-1 text-xs text-white">
        {count}
      </div>
    </div>
  );
}

type NotificationsPopoverProps = {
  groupRequests: PaginatedGroupRequests;
  registrationRequests: Registration[];
};

export function NotificationsPopover(
  props: Readonly<NotificationsPopoverProps>
) {
  const { groupRequests, registrationRequests } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { tooltipId, tooltipRef } = useTooltip(buttonRef);
  const totalRequests =
    groupRequests.totalResults + registrationRequests.length;

  return (
    <Popover>
      <PopoverButton
        variant="plain"
        className="group relative flex size-8 cursor-pointer items-center justify-center rounded-full p-1 hover:bg-white/10 dark:hover:bg-white/10"
        ref={buttonRef}
      >
        <BellIcon className="size-6 text-white dark:text-white" />
        <Badge count={totalRequests} />
        <Tooltip tooltipId={tooltipId} tooltipRef={tooltipRef}>
          Notifications
        </Tooltip>
      </PopoverButton>
      <PopoverPanel
        positionArea="bottom"
        className="p-4 text-center text-sm/6 text-gray-500 shadow transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0 dark:bg-slate-600 dark:text-white"
      >
        <p className="text-nowrap">
          You have {totalRequests} pending requests.
        </p>
        <Link className="underline" href="/requests">
          View all
        </Link>
      </PopoverPanel>
    </Popover>
  );
}
