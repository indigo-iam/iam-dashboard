// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import Link from "@/components/link";
import { Panel } from "@/components/layout";
import { ListItem } from "@/components/list";
import Paginator from "@/components/paginator";
import { ActiveToken } from "@/models/sites";
import { dateToHuman, getDate } from "@/utils/dates";
import { usePaginator } from "@/components/paginator/hook";

import { ActiveTokenOptions } from "./options";

type ActiveTokenViewProps = {
  token: ActiveToken;
};

function ActiveTokenView(props: Readonly<ActiveTokenViewProps>) {
  const { token } = props;
  const scopes = token.scopes.join(" ");
  const expiration = new Date(token.expiration);
  const expiresAt = dateToHuman(expiration);
  const expired = expiration < getDate();
  const tokenStr = `${token.value?.slice(0, 8)}...${token.value?.slice(-8)}`;
  return (
    <ListItem>
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
    </ListItem>
  );
}

type TokensPageProps = {
  tokens: ActiveToken[];
};

export function TokensPage(props: Readonly<TokensPageProps>) {
  const { tokens } = props;
  const { start, end, numberOfPages, count, ...paginator } = usePaginator(
    tokens.length
  );
  const activeTokens = tokens.slice(start, end);
  return (
    <>
      <Panel>
        <div className="flex items-center gap-2">
          <h2 className="py-2">Active Tokens</h2>
          <div
            title="Number of active tokens"
            className="middle my-auto rounded-full bg-gray-400 px-2 py-0.5 text-xs font-semibold text-white"
          >
            {tokens.length}
          </div>
        </div>
        <ul>
          {activeTokens.map(token => (
            <ActiveTokenView token={token} key={token.id} />
          ))}
        </ul>
      </Panel>
      <Paginator
        numberOfPages={numberOfPages}
        overrides={{
          ...paginator,
          count,
        }}
      />
    </>
  );
}
