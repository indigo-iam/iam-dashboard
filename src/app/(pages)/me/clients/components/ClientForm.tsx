"use client";
import { Button } from "@/components/Buttons";
import { ClientRequest, Scope } from "@/models/client";
import { ScimUser } from "@/models/scim";
import { PlusIcon } from "@heroicons/react/16/solid";
import { registerClient } from "@/services/clients";
import { useRouter } from "next/navigation";
import { useState } from "react";

const List = (props: {
  type: string;
  items: string[];
  addItem: (value: string) => void;
  removeItem: (index: number) => void;
}) => {
  const [value, setValue] = useState("");
  const listItems = props.items.map((item, index) => (
    <li key={item} className="flex flex-row items-center gap-2">
      {item}
      <Button type="button" onClick={() => props.removeItem(index)}>
        Remove
      </Button>
    </li>
  ));

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <input
          type={props.type}
          onChange={event => setValue(event.target.value)}
          className="infn-form-group-input"
        />
        <Button
          type="button"
          icon={<PlusIcon />}
          onClick={() => props.addItem(value)}
        >
          Add
        </Button>
      </div>
      <ul>{listItems}</ul>
    </div>
  );
};

const TokenEndpointAuthRadios = () => {
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
  return tokenEndpointAuthValues.map((tokenEndpointAuthValue, index) => (
    <div key={tokenEndpointAuthValue.value} className="flex flex-row gap-1">
      <input
        type="radio"
        id={tokenEndpointAuthValue.value}
        name="tokenEndpointAuthMethod"
        defaultValue={tokenEndpointAuthValue.value}
        defaultChecked={index == 0}
      />
      <label htmlFor={tokenEndpointAuthValue.value}>
        {tokenEndpointAuthValue.label}
      </label>
    </div>
  ));
};

const ScopesCheckboxes = (props: { scopes: Scope[] }) => {
  return props.scopes
    .filter(scope => !scope.restricted)
    .map(scope => (
      <div key={scope.value} className="flex flex-row gap-1">
        <input
          type="checkbox"
          id={scope.value}
          name="scopes"
          defaultValue={scope.value}
          defaultChecked={scope.defaultScope}
        />
        <label htmlFor={scope.value}>
          {scope.value}
          {scope.description && ` (${scope.description})`}
        </label>
      </div>
    ));
};

const GrantTypesCheckboxes = (props: { grantTypes: string[] }) => {
  return props.grantTypes.map((grantType, index) => (
    <div key={grantType} className="flex flex-row gap-1">
      <input
        type="checkbox"
        id={grantType}
        name="grantTypes"
        defaultValue={grantType}
        defaultChecked={index == 0}
      />
      <label htmlFor={grantType}>{grantType}</label>
    </div>
  ));
};

export const ClientForm = (props: {
  me: ScimUser;
  scopes: Scope[];
  grantTypes: string[];
}) => {
  const router = useRouter();
  const meEmails = props.me.emails?.map(email => email.value) ?? [];
  const [emails, setEmails] = useState(meEmails);
  const addEmail = (email: string) => {
    setEmails([...emails, email]);
  };
  const removeEmail = (index: number) => {
    setEmails(emails.toSpliced(index, 1));
  };
  const [redirectUris, setRedirectUris] = useState([
    "http://localhost/example",
  ]);
  const addRedirectUri = (redirectUri: string) => {
    setRedirectUris([...redirectUris, redirectUri]);
  };
  const removeRedirectUri = (index: number) => {
    setRedirectUris(redirectUris.toSpliced(index, 1));
  };
  const handleSubmit = async (formData: FormData) => {
    const client: ClientRequest = {
      redirect_uris: redirectUris,
      client_name: formData.get("clientName") as string,
      client_description: formData.get("clientDescription") as string,
      contacts: emails,
      token_endpoint_auth_method: formData.get(
        "tokenEndpointAuthMethod"
      ) as string,
      scope: formData.getAll("scopes").join(" "),
      grant_types: formData.getAll("grantTypes") as string[],
      response_types: ["code"],
    };
    try {
      const result = await registerClient(client);
      alert(
        `Client ID: ${result.client_id}\nClient secret: ${result.client_secret}`
      );
      router.push("/clients");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form className="flex flex-col gap-4" action={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="clientName">Client name</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          className="infn-form-group-input"
          minLength={4}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="clientDescription">Client description</label>
        <textarea
          id="clientDescription"
          name="clientDescription"
          className="infn-form-group-input"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="redirectUri">Redirect URIs</label>
        <List
          items={redirectUris}
          type="url"
          addItem={addRedirectUri}
          removeItem={removeRedirectUri}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="contacts">Contacts</label>
        <List
          items={emails}
          type="email"
          addItem={addEmail}
          removeItem={removeEmail}
        />
      </div>
      <fieldset className="flex flex-col gap-1">
        <legend>Token endpoint authentication method</legend>
        <TokenEndpointAuthRadios />
      </fieldset>
      <fieldset className="flex flex-col gap-1">
        <legend>System scopes</legend>
        <ScopesCheckboxes scopes={props.scopes} />
      </fieldset>
      <fieldset className="flex flex-col gap-1">
        <legend>Grant types</legend>
        <GrantTypesCheckboxes grantTypes={props.grantTypes} />
      </fieldset>
      <div className="flex flex-row gap-2">
        <Button color="primary" type="submit">
          Save client
        </Button>
        <Button color="secondary" type="button" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
