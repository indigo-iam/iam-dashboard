// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Suspense } from "react";

import { TabPanel } from "@/components/tabs";
import { LoadingList } from "@/components/loading";
import { Panel } from "@/components/layout";
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
      <Panel>
        <h2 className="py-2">Active Tokens</h2>
        <p>There are no active tokens to show.</p>
      </Panel>
    );
  }
  return <TokensPage tokens={activeTokens} />;
}

export function ActiveTokens() {
  return (
    <TabPanel variant="plain" className="space-y-4">
      <Suspense fallback={<Fallback />}>
        <AsyncActiveTokens />
      </Suspense>
    </TabPanel>
  );
}
