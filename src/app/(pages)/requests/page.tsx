import { Page } from "@/components/Layout";
import { Tab, TabPanel, TabGroup, TabList, TabPanels } from "@/components/Tabs";
import { fetchGroupsRequests } from "@/services/group-requests";
import { fetchRegistrationRequests } from "@/services/registration";
import RegistrationRequests from "./components/RegistrationRequests/Index";
import GroupRequests from "./components/GroupRequests";

export default async function Requests() {
  const groupRequests = await fetchGroupsRequests();
  const registrationRequests = await fetchRegistrationRequests();
  const certLinkRequests = [];

  return (
    <Page title="Requests">
      <TabGroup>
        <TabList>
          <Tab>{`Registration Requests (${registrationRequests.length})`}</Tab>
          <Tab>{`Group Requests (${groupRequests.totalResults})`}</Tab>
          <Tab>{`Certificate Link Requests (${certLinkRequests.length})`}</Tab>
        </TabList>
        <TabPanels>
          <RegistrationRequests requests={registrationRequests} />
          <GroupRequests requests={groupRequests.Resources} />
          <TabPanel>To be implemented.</TabPanel>
        </TabPanels>
      </TabGroup>
    </Page>
  );
}
