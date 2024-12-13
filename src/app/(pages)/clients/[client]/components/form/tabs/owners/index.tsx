import { FormSection } from "@/components/form";
import { TabPanel } from "@/components/tabs";
import { getClientOwners } from "@/services/clients";
import OwnersList from "./owners-list";

type OwnersProps = {
  client_id: string;
};

export default async function Owners(props: Readonly<OwnersProps>) {
  const { client_id } = props;
  const owners = await getClientOwners(client_id);
  return (
    <TabPanel unmount={false}>
      <FormSection htmlFor="client-owners-list" title="Client Owners">
        <p className="mt-2 text-secondary-400">
          Owners are organization users that can manage the client
          configuration.
        </p>
        <OwnersList owners={owners} />
      </FormSection>
    </TabPanel>
  );
}
