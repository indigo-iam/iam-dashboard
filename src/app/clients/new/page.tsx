// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession } from "@/auth";
import { Layout } from "@/app/components/layout";
import { getSession } from "@/auth";
import { fetchOpenIdConfiguration } from "@/services/openid-configuration";
import { fetchScopes } from "@/services/scopes";
import { redirect } from "next/navigation";
import { NewClientCarousel } from "./carousel";

export default async function NewClient() {
  const scopes = await fetchScopes();
  const openIdConfiguration = await fetchOpenIdConfiguration();
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  return (
    <Layout title="Create New Client">
      <NewClientCarousel
        systemScopes={scopes}
        openIdConfiguration={openIdConfiguration}
        isAdmin={session?.user?.isAdmin ?? false}
      />
    </Layout>
  );
}
