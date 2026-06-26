// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "@/components/link";

import { TabPanel } from "@/components/tabs";
import { ActiveToken } from "@/models/sites";
import { getActiveTokens } from "@/services/sites";
import { dateToHuman, getDate } from "@/utils/dates";
import { ActiveTokenOptions } from "./options";
import { Suspense } from "react";
import { LoadingList } from "@/components/loading";

type ActiveTokenViewProps = {
  token: ActiveToken;
};

function ActiveTokenView(props: Readonly<ActiveTokenViewProps>) {
  const { token } = props;
  const scopes = token.scopes.join(" ");
  const expiration = new Date(token.expiration);
  const expiresAt = dateToHuman(expiration);
  const expired = expiration < getDate();
  const tokenStr = `${token.value?.slice(0, 8)}...${token.value?.slice(-24)}`;
  return (
    <li className="iam-list-item">
      <div className="flex w-0 grow flex-col">
        <Link
          className="flex grow flex-col gap-0.5 lg:flex-row"
          href={`/clients/${token.clientId}`}
        >
          <div className="flex grow flex-col gap-0.5 lg:w-0">
            <p className="truncate text-gray-950 dark:text-gray-200">
              {tokenStr}
            </p>
            <p className="truncate text-sm">{token.clientId}</p>
            <p className="truncate text-sm font-light italic" title={scopes}>
              {scopes}
            </p>
          </div>
          <p className="flex items-center py-1 text-xs font-light whitespace-nowrap lg:px-2 lg:text-right">
            {expired ? `Expired ${expiresAt}` : `Expires ${expiresAt}`}
          </p>
        </Link>
      </div>
      <ActiveTokenOptions token={token} />
    </li>
  );
}

async function Content() {
  const activeTokens = await getActiveTokens();
  return (
    <ul>
      {activeTokens.map(token => (
        <ActiveTokenView token={token} key={token.id} />
      ))}
    </ul>
  );
}

export async function ActiveTokens() {
  return (
    <TabPanel className="panel">
      <h2 className="py-2">Active Tokens</h2>
      <Suspense fallback={<LoadingList />}>
        <Content />
      </Suspense>
    </TabPanel>
  );
}
