// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { getClientOwners } from "@/services/clients";
import { OwnersTable } from "./table";
import { AddOwnerButton } from "./add-owner-button";
import { Suspense } from "react";

type ContentProps = {
  clientId: string;
  clientName: string;
};

async function Content(props: Readonly<ContentProps>) {
  const { clientId, clientName } = props;
  const owners = await getClientOwners(clientId);
  return (
    <OwnersTable owners={owners} clientId={clientId} clientName={clientName} />
  );
}

type OwnersProps = {
  clientId: string;
  clientName: string;
};

export default async function Owners(props: Readonly<OwnersProps>) {
  const { clientId, clientName } = props;
  return (
    <TabPanel className="panel">
      <div className="flex flex-wrap items-center">
        <h3 className="grow py-2">Owners</h3>
        <AddOwnerButton clientId={clientId} clientName={clientName} />
      </div>
      <Suspense fallback={<p>Loading owners...</p>}>
        <Content clientId={clientId} clientName={clientName} />
      </Suspense>
    </TabPanel>
  );
}
