// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { auth } from "@/auth";
import { fetchGroupsRequests } from "@/services/group-requests";
import { fetchRegistrationRequests } from "@/services/registration";
import { NotificationsPopover } from "./popover";

export default async function Notifications() {
  const session = await auth();
  const isAdmin = session?.is_admin;

  if (!isAdmin) {
    return null;
  }

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
