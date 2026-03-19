// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Client } from "@/models/client";
import { TabPanel } from "@/components/tabs";
import { getClientOwners } from "@/services/clients";
import { OwnersTable } from "./table";
import { AddOwnerButton } from "./add-owner-button";

type OwnersProps = {
  client: Client;
};

export default async function Owners(props: Readonly<OwnersProps>) {
  const { client } = props;
  const { client_id } = client;
  const owners = await getClientOwners(client_id);
  return (
    <TabPanel className="panel" unmount={false}>
      <div className="flex flex-wrap items-center">
        <h3 className="grow py-2">Owners</h3>
        <AddOwnerButton client={client} />
      </div>
      <OwnersTable owners={owners} client={client} />
    </TabPanel>
  );
}
