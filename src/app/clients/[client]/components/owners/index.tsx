// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Suspense } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

import { TabPanel } from "@/components/tabs";
import { getClientOwners } from "@/services/clients";

import { OwnersTable } from "./table";
import { AddOwnerButton } from "./add-owner-button";

type ContentProps = {
  clientId: string;
  clientName: string;
};

async function Content(props: Readonly<ContentProps>) {
  const { clientId, clientName } = props;
  const owners = await getClientOwners(clientId);
  if (owners.length === 0) {
    return (
      <>
        <h2 className="grow">Owners</h2>
        <div>
          <UserCircleIcon className="mx-auto size-16 text-slate-500 dark:text-gray-300" />
          <p className="p-2 text-center text-sm">
            Assign a user as owner of this client.
          </p>
          <AddOwnerButton
            clientId={clientId}
            clientName={clientName}
            className="mx-auto"
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="grow">Owners</h2>
        <AddOwnerButton
          clientId={clientId}
          clientName={clientName}
          variant="outline"
        />
      </div>
      <OwnersTable
        owners={owners}
        clientId={clientId}
        clientName={clientName}
      />
    </>
  );
}

type OwnersProps = {
  clientId: string;
  clientName: string;
};

export default function Owners(props: Readonly<OwnersProps>) {
  const { clientId, clientName } = props;
  return (
    <TabPanel>
      <Suspense fallback={<p>Loading owners...</p>}>
        <Content clientId={clientId} clientName={clientName} />
      </Suspense>
    </TabPanel>
  );
}
