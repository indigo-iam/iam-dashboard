// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { redirect, notFound } from "next/navigation";

import { getSession, isUserAdmin } from "@/auth";
import { settings } from "@/config";
import { fetchScopePolicy } from "@/services/scope-policies";
import { Container, Header, Panel, Section } from "@/components/layout";
import { ScopePoliciesForm } from "../components";

const { IAM_DASHBOARD_SCOPE_POLICY_MODE } = settings;

type PolicyPageProps = {
  params: Promise<{ policy: number }>;
};

export default async function PolicyPage(props: Readonly<PolicyPageProps>) {
  if (IAM_DASHBOARD_SCOPE_POLICY_MODE === undefined) {
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
  const { params } = props;
  const id = (await params).policy;
  const policy = await fetchScopePolicy(id);
  return (
    <Section>
      <Header>
        <h2 className="text-base font-normal">Edit Scope Policy</h2>
      </Header>
      <Container>
        <Panel>
          <h2>{policy.description}</h2>
          <ScopePoliciesForm
            policy={policy}
            readWrite={IAM_DASHBOARD_SCOPE_POLICY_MODE === "readwrite"}
          />
        </Panel>
      </Container>
    </Section>
  );
}
