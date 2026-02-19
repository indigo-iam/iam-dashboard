// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession, isUserAdmin } from "@/auth";
import { Layout } from "@/app/components/layout";
import { Tab, TabGroup, TabList, TabPanels } from "@/components/tabs";
import { fetchGroupsRequests } from "@/services/group-requests";
import { fetchRegistrationRequests } from "@/services/registration";
import { Groups, Registrations } from "./components";
import { CertificateLinkRequests } from "./components/certificates";
import { redirect } from "next/navigation";

export default async function Requests() {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    redirect("/");
  }
  const groupRequests = await fetchGroupsRequests();
  const registrationRequests = await fetchRegistrationRequests();
  const certLinkRequests = [];
  return (
    <Layout title="Requests">
      <TabGroup className="space-y-4">
        <TabList className="flex overflow-auto text-xl">
          <Tab>{`REGISTRATION REQUESTS (${registrationRequests.length})`}</Tab>
          <Tab>{`GROUP REQUESTS (${groupRequests.totalResults})`}</Tab>
          <Tab>{`CERTIFICATE LINK REQUESTS (${certLinkRequests.length})`}</Tab>
        </TabList>
        <TabPanels>
          <Registrations requests={registrationRequests} />
          <Groups requests={groupRequests.Resources} />
          <CertificateLinkRequests />
        </TabPanels>
      </TabGroup>
    </Layout>
  );
}
