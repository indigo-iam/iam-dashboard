// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Layout } from "@/app/components/layout";
import { fetchScopePolicy } from "@/services/scope-policies";
import { ScopePoliciesForm } from "../components";

type PolicyPageProps = {
  params: Promise<{ policy: number }>;
};

export default async function PolicyPage(props: Readonly<PolicyPageProps>) {
  const { params } = props;
  const id = (await params).policy;
  const policy = await fetchScopePolicy(id);
  return (
    <Layout title="Edit Scope Policy">
      <div className="panel space-y-4">
        <h2>{policy.description}</h2>
        <ScopePoliciesForm policy={policy}/>
      </div>
    </Layout>
  );
}
