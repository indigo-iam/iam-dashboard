// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { CubeIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";

import { getSession, isUserAdmin } from "@/auth";
import { Container, Section } from "@/components/layout";
import { fetchScopes } from "@/services/scopes";
import { fetchOpenIdConfiguration } from "@/services/openid-configuration";
import { NewClientCarousel } from "./carousel";

export default async function NewClient() {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const scopes = await fetchScopes();
  const openIdConfiguration = await fetchOpenIdConfiguration();
  const isAdmin = await isUserAdmin();
  return (
    <Section>
      <header className="section-header">
        <CubeIcon className="size-5" />
        <h2 className="text-base font-normal">New client</h2>
      </header>
      <Container>
        <NewClientCarousel
          systemScopes={scopes}
          openIdConfiguration={openIdConfiguration}
          isAdmin={isAdmin}
        />
      </Container>
    </Section>
  );
}
