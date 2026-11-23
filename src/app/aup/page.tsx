// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { redirect } from "next/navigation";
import { DocumentTextIcon } from "@heroicons/react/24/solid";

import { getSession, isUserAdmin } from "@/auth";
import { fetchAUP } from "@/services/aup";
import { Container, Header, Panel, Section } from "@/components/layout";
import { AupView, CreateButton } from "./components/";

export default async function AUP() {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    redirect("/");
  }
  const aup = await fetchAUP();
  if (!aup) {
    return (
      <Section>
        <Header>
          <DocumentTextIcon className="size-5" />
          <h2 className="text-base font-normal">Acceptable Usage Policy</h2>
        </Header>
        <Container>
          <div className="mt-16 flex items-center justify-between">
            <div className="space-y-8">
              <div className="space-y-2">
                <h2>Create an Acceptable Usage Policy</h2>
                <p className="text-gray-500">
                  Create an Acceptable Usage Policy (AUP) for your organization.
                  Users need to sign the AUP to use this service.
                </p>
              </div>
              <CreateButton />
            </div>
            <DocumentTextIcon className="size-36 flex-none text-gray-300 sm:size-48 md:size-48 lg:size-96 dark:text-gray-500" />
          </div>
        </Container>
      </Section>
    );
  }

  const aupContent =
    "title" in aup ? `${aup.title} ${aup.description}` : <AupView aup={aup} />;

  return (
    <Section>
      <Header>
        <DocumentTextIcon className="size-5" />
        <h2 className="text-base font-normal">Acceptable Usage Policy</h2>
      </Header>
      <Container>
        <Panel>{aupContent}</Panel>
      </Container>
    </Section>
  );
}
