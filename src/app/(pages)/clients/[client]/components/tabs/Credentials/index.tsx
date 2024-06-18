import { FormSection } from "@/components/Form";
import { TabPanel } from "@/components/Tabs";
import TokenEndpointAuthMethodRadios from "./TokenEndpointAuthMethodRadios";
import ClientSecret from "./ClientSecret";
import RegistrationAccessToken from "./RegistrationAccessToken";
import PublicKeySet from "./PublicKeySet";
import JSONWebKeysetURI from "./JSONWebKeysetUri";

export default function Credentials() {
  return (
    <TabPanel>
      <FormSection
        htmlFor="token-endpoint-auth-method-radio"
        title="Token Endpoint Authentication Method"
      >
        <TokenEndpointAuthMethodRadios />
      </FormSection>
      <FormSection
        htmlFor="regenerate-client-secret"
        title="Regenerate Client Secret"
      >
        <ClientSecret />
      </FormSection>
      <FormSection
        htmlFor="regeneration-registration-at"
        title="Registration Access Token"
      >
        <RegistrationAccessToken />
      </FormSection>
      <FormSection htmlFor="public-key-set-radio" title="Public Key Set">
        <PublicKeySet />
      </FormSection>
      <FormSection htmlFor="json-web-keyset-uri" title="JSON Web Keyset URI">
        <JSONWebKeysetURI />
      </FormSection>
    </TabPanel>
  );
}
