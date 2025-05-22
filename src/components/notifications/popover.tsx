// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { PaginatedGroupRequests } from "@/models/group-requests";
import { Registration } from "@/models/registration";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/16/solid";
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
    <div className="relative -top-8">
      <div className="bg-danger text-secondary absolute z-30 inline-flex size-5 items-center justify-center rounded-full p-2 text-xs">
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
  const totalRequests =
    groupRequests.totalResults + registrationRequests.length;

  return (
    <Popover className="">
      <PopoverButton className="rounded-full p-2 hover:bg-white/10">
        <BellIcon className="text-secondary size-6" />
        <Badge count={totalRequests} />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="items z-50 flex flex-col items-center divide-y divide-white/5 overflow-hidden rounded-xl bg-white p-4 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
      >
        {({ close }) => (
          <>
            <span>You have {totalRequests} pending requests.</span>
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
