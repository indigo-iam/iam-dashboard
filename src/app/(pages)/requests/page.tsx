import { Page, Panel, Section } from "@/components/Layout";
import { Tab, TabPanel, TabGroup, TabList, TabPanels } from "@/components/Tabs";
import { fetchGroupsRequests } from "@/services/group-requests";
import { fetchRegistrationRequests } from "@/services/registration";
import Registrations from "./components/Registrations";
import Groups from "./components/Groups";

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
