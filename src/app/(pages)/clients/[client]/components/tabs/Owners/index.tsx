import { FormSection } from "@/components/Form";
import { TabPanel } from "@/components/Tabs";
import { getClientOwners } from "@/services/clients";
import OwnersList from "./OwnersList";

type OwnersProps = {
  client_id: string;
};

export default async function Owners(props: Readonly<OwnersProps>) {
  const { client_id } = props;
  const owners = await getClientOwners(client_id);
  return (
    <TabPanel>
      <FormSection htmlFor="client-owners-list" title="Client Owners">
        <p className="mt-2 text-sm text-secondary-400">
          Owners are organization users that can manage the client
          configuration.
        </p>
        <OwnersList owners={owners} />
      </FormSection>
    </TabPanel>
  );
}
