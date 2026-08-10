// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { redirect } from "next/navigation";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";

import { getSession, isUserAdmin } from "@/auth";
import { fetchGroupsRequests } from "@/services/group-requests";
import { fetchRegistrationRequests } from "@/services/registration";
import { Groups, Registrations } from "./components";

export default async function Requests() {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    redirect("/");
  }
  const groupRequests = await fetchGroupsRequests();
  const registrationRequests = await fetchRegistrationRequests();
  const totalRequests =
    groupRequests.totalResults + registrationRequests.length;
  return (
    <section>
      <header className="section-header items-center">
        <InboxArrowDownIcon className="size-5" />
        <h2 className="py-1 text-base font-normal">Requests</h2>
        <div
          title="Total number of requests"
          className="middle rounded-full bg-gray-400 px-2 py-0.5 text-xs font-semibold text-white"
        >
          {totalRequests}
        </div>
      </header>
      <div className="container space-y-4">
        <Registrations requests={registrationRequests} />
        <Groups requests={groupRequests.Resources} />
      </div>
    </section>
  );
}
