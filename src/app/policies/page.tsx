// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession, isUserAdmin } from "@/auth";
import { fetchScopePolicies } from "@/services/scope-policies";
import { AddPolicyButton, PoliciesTable } from "./components";
import { redirect } from "next/navigation";
import { ScaleIcon } from "@heroicons/react/24/solid";
import { BeakerIcon } from "@heroicons/react/24/outline";

export default async function Policies() {
  // temporary hide this page until finished
  redirect("/");

  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    redirect("/");
  }
  const policies = await fetchScopePolicies();
  return (
    <section>
      <header className="section-header flex flex-wrap gap-2">
        <div className="flex grow gap-2">
          <ScaleIcon className="size-5" />
          <h2 className="text-base font-normal">Scope Policies</h2>
        </div>
        <AddPolicyButton />
      </header>
      <div className="container space-y-4">
        <h2 className="flex items-center gap-2">
          <BeakerIcon className="size-7" />
          Experimental
        </h2>
        <div className="panel">
          <PoliciesTable policies={policies} />
        </div>
      </div>
    </section>
  );
}
