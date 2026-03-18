// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession, isUserAdmin } from "@/auth";
import { fetchOpenIdConfiguration } from "@/services/openid-configuration";
import { fetchScopes } from "@/services/scopes";
import { redirect } from "next/navigation";
import { NewClientCarousel } from "./carousel";

import { RocketLaunchIcon } from "@heroicons/react/24/solid";

export default async function NewClient() {
  const scopes = await fetchScopes();
  const openIdConfiguration = await fetchOpenIdConfiguration();
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const isAdmin = await isUserAdmin();
  return (
    <section className="space-y-4">
      <header className="section-header">
        <RocketLaunchIcon className="size-5" />
        <h2 className="text-base font-normal">New client</h2>
      </header>
      <div className="container">
        <NewClientCarousel
          systemScopes={scopes}
          openIdConfiguration={openIdConfiguration}
          isAdmin={isAdmin}
        />
      </div>
    </section>
  );
}
