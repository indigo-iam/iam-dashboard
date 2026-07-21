// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { fetchGroupsRequests } from "@/services/group-requests";
import { fetchRegistrationRequests } from "@/services/registration";
import { NotificationsPopover } from "./popover";

import { BellIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";

async function Content() {
  const [registrationRequests, groupRequests] = await Promise.all([
    fetchRegistrationRequests(),
    fetchGroupsRequests(),
  ]);

  return (
    <NotificationsPopover
      groupRequests={groupRequests}
      registrationRequests={registrationRequests}
    />
  );
}

function Fallback() {
  return (
    <div
      title="Notifications"
      className="flex size-8 items-center justify-center rounded-full p-1"
    >
      <BellIcon className="size-6 text-white dark:text-white" />
    </div>
  );
}

export default async function Notifications() {
  return (
    <Suspense fallback={<Fallback />}>
      <Content />
    </Suspense>
  );
}
