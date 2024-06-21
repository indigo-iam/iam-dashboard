import Input from "@/components/Input";
import { TabPanel } from "@/components/Tabs";
import RedirectUris from "./RedirectUris";
import Contacts from "./Contacts";
import { FormSection } from "@/components/Form";
import { ClientBase } from "@/models/client";

interface MainProps extends ClientBase {}

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
    <TabPanel unmount={false}>
      <FormSection htmlFor="client-name" title="Client Name">
        <Input
          type="text"
          id="client-name"
          name="client_name"
          defaultValue={client_name}
          minLength={4}
          required
        />
      </FormSection>
      <FormSection htmlFor="client-id" title="Client ID">
        <input
          name="client_id"
          defaultValue={client_id}
          contentEditable={false}
        />
      </FormSection>
      <FormSection htmlFor="client-description" title="Client description">
        <textarea
          id="client-description"
          name="client_description"
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
    </TabPanel>
  );
}
