// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession, isUserAdmin } from "@/auth";
import { fetchScopePolicy } from "@/services/scope-policies";
import Editor from "./components/editor";
import { redirect } from "next/navigation";

type PolicyPageProps = {
  params: Promise<{ policy: number }>;
};

export default async function PolicyPage(props: Readonly<PolicyPageProps>) {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    redirect("/");
  }
  const { params } = props;
  const id = (await params).policy;
  const policy = await fetchScopePolicy(id);
  return (
    <section>
      <header className="section-header">
        <h2 className="text-base font-normal">Edit Scope Policy</h2>
      </header>
      <div className="content">
        <div className="panel space-y-4">
          <h2>{policy.description}</h2>
          <Editor policy={policy} />
        </div>
      </div>
    </section>
  );
}
