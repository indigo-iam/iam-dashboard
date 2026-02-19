// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Layout } from "@/app/components/layout";
import { getSession, isUserAdmin } from "@/auth";
import { fetchOpenIdConfiguration } from "@/services/openid-configuration";
import { fetchScopes } from "@/services/scopes";
import { redirect } from "next/navigation";
import { NewClientCarousel } from "./carousel";

export default async function NewClient() {
  const scopes = await fetchScopes();
  const openIdConfiguration = await fetchOpenIdConfiguration();
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const isAdmin = await isUserAdmin();
  return (
    <Layout title="Create New Client">
      <NewClientCarousel
        systemScopes={scopes}
        openIdConfiguration={openIdConfiguration}
        isAdmin={isAdmin}
      />
    </Layout>
  );
}
