// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Client } from "@/models/client";
import { Description, Field, Form, Label } from "@/components/form";
import { TabPanel } from "@/components/tabs";
import { getClientOwners } from "@/services/clients";
import OwnersList from "./owners-list";

type OwnersProps = {
  client: Client;
};

export default async function Owners(props: Readonly<OwnersProps>) {
  const { client } = props;
  const { client_id } = client;
  const owners = await getClientOwners(client_id);

  return (
    <TabPanel className="panel flex flex-col gap-4 pb-4 lg:flex-row">
      <div className="text-extralight flex w-full flex-col gap-2 text-sm lg:w-1/3">
        <p className="dark:text-light-gray/80">
          Group owners can manage add and remove users and create and delete
          sub-groups.
        </p>
      </div>
      <Form className="flex w-full flex-col gap-4 lg:w-2/3">
        <Field>
          <Label>Owners</Label>
          <Description>
            Owners are organization users that can manage the client
            configuration.
          </Description>
          <OwnersList client={client} owners={owners} />
        </Field>
      </Form>
    </TabPanel>
  );
}
