// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { UserCircleIcon } from "@heroicons/react/24/solid";
import { fetchMe } from "@/services/me";
import Notifications from "@/components/notifications";
import { Logout } from "@/components/buttons";

const UserLogo = (props: { username: string }) => {
  const { username } = props;
  return (
    <div className="flex justify-center px-2">
      <UserCircleIcon className="w-12" />
      <h2 className="my-auto px-4">{username}</h2>
    </div>
  );
};

export default async function LogoHeader() {
  const me = await fetchMe();
  let username = me.name?.formatted ? me.name.formatted : "Unknown User";
  return (
    <div id="logo-header" className="flex flex-col gap-2">
      <UserLogo username={username} />
      <div className="flex justify-center">
        <Notifications />
        <Logout />
      </div>
      <hr className="bg-secondary" />
    </div>
  );
}
