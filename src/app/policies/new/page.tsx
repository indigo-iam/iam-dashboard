// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { notFound, redirect } from "next/navigation";

import { getSession } from "@/auth";
import { settings } from "@/config";

import { Container, Header, Panel, Section } from "@/components/layout";
import { ScopePoliciesForm } from "../components";

const { IAM_DASHBOARD_SCOPE_POLICY_MODE } = settings;

export default async function Policies() {
  if (IAM_DASHBOARD_SCOPE_POLICY_MODE !== "readwrite") {
    return notFound();
  }
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  return (
    <Section>
      <Header>
        <h2 className="text-base font-normal">Create Scope Policy</h2>
      </Header>
      <Container>
        <Panel>
          <ScopePoliciesForm readWrite={true} />
        </Panel>
      </Container>
    </Section>
  );
}
