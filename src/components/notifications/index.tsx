// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { fetchGroupsRequests } from "@/services/group-requests";
import { fetchRegistrationRequests } from "@/services/registration";
import { NotificationsPopover } from "./popover";

type NotificationsProps = {
  className?: string;
};

export default async function Notifications(
  props: Readonly<NotificationsProps>
) {
  const { className, ...others } = props;
  const [registrationRequests, groupRequests] = await Promise.all([
    fetchRegistrationRequests(),
    fetchGroupsRequests(),
  ]);

  return (
    <NotificationsPopover
      groupRequests={groupRequests}
      registrationRequests={registrationRequests}
      className={className}
      {...others}
    />
  );
}
