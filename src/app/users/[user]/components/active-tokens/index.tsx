// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Suspense } from "react";

import { TabPanel } from "@/components/tabs";
import { getActiveTokens } from "@/services/sites";
import { LoadingList } from "@/components/loading";
import { TokensPage } from "./tokens-page";

function Fallback() {
  return (
    <div className="panel">
      <h2 className="py-2">Active Tokens</h2>
      <LoadingList />
    </div>
  );
}

async function AsyncActiveTokens() {
  const activeTokens = await getActiveTokens();
  if (activeTokens.length === 0) {
    return (
      <div className="panel">
        <h2 className="py-2">Active Tokens</h2>
        <p>Nothing active tokens to show.</p>
      </div>
    );
  }
  return <TokensPage tokens={activeTokens} />;
}

export async function ActiveTokens() {
  return (
    <TabPanel>
      <Suspense fallback={<Fallback />}>
        <AsyncActiveTokens />
      </Suspense>
    </TabPanel>
  );
}
