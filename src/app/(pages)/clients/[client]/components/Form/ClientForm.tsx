import { TabGroup, TabList, TabPanels } from "@headlessui/react";
import Tab from "@/components/Tabs/Tab";
import {
  Main,
  Credentials,
  Crypto,
  Scopes,
  GrantTypes,
  Tokens,
  OtherInfo,
  Owners,
} from "./tabs";
import FormButtons from "./tabs/form-buttons";
import { Form } from "@/components/Form";
import { Client } from "@/models/client";

export type ClientFormProps = {
  client: Client;
  editClientAction: (formData: FormData) => Promise<void>;
  isAdmin?: boolean;
};

export default function ClientForm(props: Readonly<ClientFormProps>) {
  const { client, editClientAction, isAdmin } = props;
  return (
    <Form action={editClientAction}>
      <TabGroup className="w-full p-2">
        <TabList className="flex max-w-full overflow-auto">
          <Tab>Main</Tab>
          <Tab>Credentials</Tab>
          <Tab>Scopes</Tab>
          <Tab>Grant Types</Tab>
          {isAdmin ? <Tab>Tokens</Tab> : null}
          <Tab>Crypto</Tab>
          <Tab>Other Info</Tab>
          {isAdmin ? <Tab>Owners</Tab> : null}
        </TabList>
        <TabPanels>
          <Main {...client} />
          <Credentials {...client} />
          <Scopes {...client} />
          <GrantTypes {...client} />
          {isAdmin ? <Tokens {...client} /> : null}
          <Crypto {...client} />
          <OtherInfo {...client} />
          {isAdmin ? <Owners {...client} /> : null}
        </TabPanels>
      </TabGroup>
      <FormButtons />
    </Form>
  );
}
