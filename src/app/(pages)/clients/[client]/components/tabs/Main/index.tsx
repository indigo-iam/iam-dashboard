import Input from "@/components/Input";
import { TabPanel } from "@/components/Tabs";
import RedirectUris from "./RedirectUris";
import Contacts from "./Contacts";
import { FormSection } from "@/components/Form";

type MainProps = {
  client_name?: string;
  client_id: string;
  client_description?: string;
  redirect_uris?: string[];
  dynamically_registered: boolean;
  contacts?: string[];
};

export default function Main(props: Readonly<MainProps>) {
  const {
    client_name,
    client_id,
    client_description,
    redirect_uris,
    dynamically_registered,
    contacts,
  } = props;

  return (
    <TabPanel>
      <div className="flex flex-col gap-1">
        <FormSection htmlFor="client-name" title="Client Name">
          <Input
            type="text"
            id="client-name"
            name="client-name"
            defaultValue={client_name}
            minLength={4}
            required
          />
        </FormSection>
        <FormSection htmlFor="client-id" title="Client ID">
          <p>{client_id}</p>
        </FormSection>
        <FormSection htmlFor="client-description" title="Client description">
          <textarea
            name="client-description"
            className="w-full border p-2"
            defaultValue={client_description}
          />
        </FormSection>
        <FormSection
          htmlFor="dynamically-registered"
          title="Dynamically Registered"
        >
          <p>{dynamically_registered === true ? "true" : "false"}</p>
        </FormSection>
        <FormSection htmlFor="redirect-uris" title="Redirect URIs">
          <RedirectUris redirect_uris={redirect_uris} />
        </FormSection>
        <FormSection htmlFor="contacts-input" title="Contacts">
          <Contacts contacts={contacts} />
        </FormSection>
      </div>
    </TabPanel>
  );
}
