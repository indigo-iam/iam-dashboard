// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Layout } from "@/app/components/layout";
import { fetchOpenIdConfiguration } from "@/services/openid-configuration";
import { fetchScopes } from "@/services/scopes";
import { NewClientCarousel } from "./carousel";
import { auth } from "@/auth";

export default async function NewClient() {
  const scopes = await fetchScopes();
  const openIdConfiguration = await fetchOpenIdConfiguration();
  const session = await auth();

  return (
    <Layout title="Create New Client">
      <NewClientCarousel
        systemScopes={scopes}
        openIdConfiguration={openIdConfiguration}
        isAdmin={session?.is_admin ?? false}
      />
    </Layout>
  );
}
