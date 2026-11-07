// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { notFound, redirect } from "next/navigation";
import { ScaleIcon } from "@heroicons/react/24/solid";

import { getSession, isUserAdmin } from "@/auth";
import { settings } from "@/config";
import { fetchScopePolicies } from "@/services/scope-policies";

import { AddPolicyButton, PoliciesTable } from "./components";
import { Container } from "@/components/container";

const { IAM_DASHBOARD_SCOPE_POLICY_MODE } = settings;

export default async function Policies() {
  if (
    IAM_DASHBOARD_SCOPE_POLICY_MODE !== "readonly" &&
    IAM_DASHBOARD_SCOPE_POLICY_MODE !== "readwrite"
  ) {
    return notFound();
  }
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
        {IAM_DASHBOARD_SCOPE_POLICY_MODE === "readwrite" && <AddPolicyButton />}
      </header>
      <Container>
        <div className="panel">
          <PoliciesTable policies={policies} />
        </div>
      </Container>
    </section>
  );
}
