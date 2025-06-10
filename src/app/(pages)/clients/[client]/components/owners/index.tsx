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
    <TabPanel className="panel grid grid-cols-3 gap-4 pb-4">
      <div className="text-extralight col-span-full flex flex-col gap-2 text-sm sm:col-span-1">
        Group owners can manage add and remove users and create and delete
        sub-groups.
      </div>
      <Form className="col-span-full flex flex-col gap-4 sm:col-span-2">
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
