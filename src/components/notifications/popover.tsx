// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { PaginatedGroupRequests } from "@/models/group-requests";
import { Registration } from "@/models/registration";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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
  className?: string;
};

export function NotificationsPopover(
  props: Readonly<NotificationsPopoverProps>
) {
  const { groupRequests, registrationRequests, className, ...others } = props;
  const totalRequests =
    groupRequests.totalResults + registrationRequests.length;

  return (
    <Popover className={className} {...others}>
      <PopoverButton
        title="Notifications"
        className="flex size-8 items-center justify-center rounded-full p-1 hover:bg-white/10 dark:hover:bg-white/10"
      >
        <BellIcon className="size-6 text-white dark:text-white" />
        <Badge count={totalRequests} />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="items z-50 flex flex-col items-center overflow-hidden rounded-xl bg-white p-4 text-sm/6 text-gray-500 shadow transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0 dark:bg-slate-600 dark:text-white"
      >
        {({ close }) => (
          <>
            <p className="text-nowrap">
              You have {totalRequests} pending requests.
            </p>
            <Link
              className="underline"
              href="/requests"
              onClick={() => close()}
            >
              View all
            </Link>
          </>
        )}
      </PopoverPanel>
    </Popover>
  );
}
