// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession, isUserAdmin } from "@/auth";
import { fetchAUP } from "@/services/aup";
import { AupView, CreateButton } from "./components/";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";
import { Container, Header, Panel, Section } from "@/components/layout";

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
          <div className="flex grow items-center gap-2">
            <DocumentTextIcon className="size-5" />
            <h2 className="text-base font-normal">Acceptable Usage Policy</h2>
          </div>
          <CreateButton />
        </Header>
        <Container className="flex flex-col items-center">
          <DocumentTextIcon className="mt-32 size-48 text-gray-500 dark:text-gray-300" />
          <p className="text-center text-xl">
            AUP is not defined for this organization.
          </p>
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
