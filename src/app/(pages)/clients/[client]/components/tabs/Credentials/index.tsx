import Button from "@/components/Button";
import Input from "@/components/Input";
import { FormSection } from "@/components/Form";
import { TabPanel } from "@/components/Tabs";
import { ClientCredentials, TokenEndpointAuthMethod } from "@/models/client";

type TokenEndpointAuthMethodRadiosProps = {
  defaultChecked: TokenEndpointAuthMethod;
};

function TokenEndpointAuthMethodRadios(
  props: Readonly<TokenEndpointAuthMethodRadiosProps>
) {
  const { defaultChecked } = props;
  const tokenEndpointAuthValues = [
    {
      value: "client_secret_basic",
      label: "Client secret over HTTP basic authentication",
    },
    {
      value: "client_secret_post",
      label: "Client secret over HTTP POST authentication",
    },
    {
      value: "client_secret_jwt",
      label: "Client secret with symmetrically signed JWT assertion",
    },
    {
      value: "private_key_jwt",
      label: "Asymmetrically signed JWT assertion",
    },
    {
      value: "none",
      label: "No authentication",
    },
  ];

  return tokenEndpointAuthValues.map(method => (
    <div key={method.value} className="flex flex-row gap-1 py-0.5">
      <input
        type="radio"
        id={method.value}
        name="token_endpoint_auth_method"
        value={method.value}
        defaultChecked={method.value === defaultChecked}
      />
      <label htmlFor={method.value}>{method.label}</label>
    </div>
  ));
}

function ClientSecret() {
  return (
    <div className="max-w-54">
      <Button>Regenerate Client Secret</Button>
    </div>
  );
}

function RegistrationAccessToken() {
  return (
    <div className="max-w-54">
      <Button>Regenerate Registration Access Token</Button>
    </div>
  );
}

function PublicKeySet() {
  return (
    <>
      <div className="flex gap-2">
        <div className="space-x-1">
          <input type="radio" id="by-uri-radio" name="by-uri-radio" />
          <label htmlFor="by-uri-radio">By URI</label>
        </div>
        <div className="space-x-1">
          <input type="radio" id="by-value-radio" name="by-value-radio" />
          <label htmlFor="by-value-radio">By value</label>
        </div>
      </div>
      <p className="mt-2 text-xs text-secondary-400">
        The JSON Web Keyset for this client. Used for client authentication and
        token encryption. Keys can be provided by reference or by value.
      </p>
    </>
  );
}

function JSONWebKeysetURI() {
  return (
    <>
      <Input placeholder="https://app.example.org/jwk" />
      <p className="mt-2 text-xs text-secondary-400">
        URL that points to the public JSON Web Keyset for this client.
      </p>
    </>
  );
}

interface CredentialsProps extends ClientCredentials {}

export default function Credentials(props: Readonly<CredentialsProps>) {
  let { token_endpoint_auth_method } = props;

  if (token_endpoint_auth_method === undefined) {
    token_endpoint_auth_method = "none";
  }

  return (
    <TabPanel unmount={false}>
      <FormSection
        htmlFor="token-endpoint-auth-method-radio"
        title="Token Endpoint Authentication Method"
      >
        <TokenEndpointAuthMethodRadios
          defaultChecked={token_endpoint_auth_method}
        />
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
