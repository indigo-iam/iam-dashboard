// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Page, Panel, Section } from "@/components/layout";
import { Tab, TabPanel, TabGroup, TabList, TabPanels } from "@/components/tabs";
import { fetchGroupsRequests } from "@/services/group-requests";
import { fetchRegistrationRequests } from "@/services/registration";
import { Groups, Registrations } from "./components";

export default async function Requests() {
  const groupRequests = await fetchGroupsRequests();
  const registrationRequests = await fetchRegistrationRequests();
  const certLinkRequests = [];

  return (
    <Page title="Requests">
      <Panel>
        <Section>
          <TabGroup>
            <TabList>
              <Tab>{`Registration Requests (${registrationRequests.length})`}</Tab>
              <Tab>{`Group Requests (${groupRequests.totalResults})`}</Tab>
              <Tab>{`Certificate Link Requests (${certLinkRequests.length})`}</Tab>
            </TabList>
            <TabPanels>
              <Registrations requests={registrationRequests} />
              <Groups requests={groupRequests.Resources} />
              <TabPanel>To be implemented.</TabPanel>
            </TabPanels>
          </TabGroup>
        </Section>
      </Panel>
    </Page>
  );
}
