// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Suspense } from "react";
import { TicketIcon } from "@heroicons/react/24/solid";

import { TabPanel } from "@/components/tabs";
import { LoadingList } from "@/components/loading";
import { getActiveTokens } from "@/services/sites";

import { TokensPage } from "./tokens-page";

function Fallback() {
  return (
    <>
      <h2 className="py-2">Active Tokens</h2>
      <LoadingList />
    </>
  );
}

async function AsyncActiveTokens() {
  let activeTokens = await getActiveTokens();
  activeTokens = activeTokens.filter(t => !!t.value);
  if (activeTokens.length === 0) {
    return (
      <>
        <h2>Active Tokens</h2>
        <div>
          <TicketIcon className="mx-auto size-16 text-gray-400" />
          <p className="p-2 text-center text-sm">
            There are no active tokens to show.
          </p>
        </div>
      </>
    );
  }
  return <TokensPage tokens={activeTokens} />;
}

export function ActiveTokens() {
  return (
    <TabPanel>
      <Suspense fallback={<Fallback />}>
        <AsyncActiveTokens />
      </Suspense>
    </TabPanel>
  );
}
