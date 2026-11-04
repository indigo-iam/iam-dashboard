// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession } from "@/auth";
import { redirect } from "next/navigation";

import { ScopePoliciesForm } from "../components";

export default async function Policies() {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  return (
    <section>
      <header className="section-header">
        <h2 className="text-base font-normal">Create Scope Policy</h2>
      </header>
      <div className="container">
        <div className="space-y-4">
          <div className="panel space-y-4">
            <ScopePoliciesForm />
          </div>
        </div>
      </div>
    </section>
  );
}
