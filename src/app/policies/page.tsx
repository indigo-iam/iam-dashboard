// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession, isUserAdmin } from "@/auth";
import { fetchScopePolicies } from "@/services/scope-policies";
import { AddPolicyButton, PoliciesTable } from "./components";
import { redirect } from "next/navigation";
import { ScaleIcon } from "@heroicons/react/24/solid";

export default async function Policies() {
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
      <header className="section-header">
        <div className="flex grow gap-2">
          <ScaleIcon className="size-5" />
          <h2 className="text-base font-normal">Scope Policies</h2>
        </div>
        <AddPolicyButton />
      </header>
      <div className="container space-y-4">
        <p className="font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in
          accumsan leo. Suspendisse potenti. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas.
          Vestibulum a metus sed ipsum sodales laoreet ac efficitur mi. Integer
          tempus sit amet enim eget consequat. Phasellus sit amet fringilla mi,
          id hendrerit quam.
        </p>
        <div className="panel">
          <PoliciesTable policies={policies} />
        </div>
      </div>
    </section>
  );
}
