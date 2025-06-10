// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Page, Panel } from "@/components/layout";
import { fetchScopePolicy } from "@/services/scope-policies";
import Editor from "./components/editor";

type PolicyPageProps = {
  params: Promise<{ policy: number }>;
};

export default async function PolicyPage(props: Readonly<PolicyPageProps>) {
  const { params } = props;
  const id = (await params).policy;
  const policy = await fetchScopePolicy(id);
  return (
    <Page title="Edit Scope Policy">
      <Panel>
        <div className="panel">
          <h2>{policy.description}</h2>
          <Editor policy={policy} />
        </div>
      </Panel>
    </Page>
  );
}
