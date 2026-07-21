// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useState } from "react";

import Link from "@/components/link";
import Paginator from "@/components/paginator";
import { ActiveToken } from "@/models/sites";
import { dateToHuman, getDate } from "@/utils/dates";
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

type TokensPageProps = {
  tokens: ActiveToken[];
};

export function TokensPage(props: Readonly<TokensPageProps>) {
  const { tokens } = props;
  const [count, setCount] = useState(10);
  const [page, setPage] = useState(1);
  const numberOfPages = Math.ceil(tokens.length / count);
  const goFirst = () => setPage(1);
  const goPrevious = () => setPage(Math.max(0, page - 1));
  const goNext = () => setPage(Math.min(page + 1, numberOfPages));
  const goLast = () => setPage(numberOfPages);
  const changeCount = (n: number) => {
    setCount(n);
    setPage(1);
  };
  const start = (page - 1) * count;
  const end = start + count;
  const activeTokens = tokens.slice(start, end);
  return (
    <div className="space-y-4">
      <div className="panel">
        <h2 className="py-2">Active Tokens</h2>
        <ul>
          {activeTokens.map(token => (
            <ActiveTokenView token={token} key={token.id} />
          ))}
        </ul>
      </div>
      <Paginator
        numberOfPages={numberOfPages}
        overrides={{
          onFirst: goFirst,
          onPrevious: goPrevious,
          onNext: goNext,
          onLast: goLast,
          onCountChange: changeCount,
          currentPage: page,
          count,
        }}
      />
    </div>
  );
}
