// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "next/link";

import TabPanel from "@/components/tabs/tab-panel";
import { ActiveToken } from "@/models/sites";
import { getActiveTokens } from "@/services/sites";
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
  const tokenStr = `${token.value?.slice(0, 8)}...${token.value?.slice(-24)}`;
  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow flex-col">
        <Link
          className="dark:text-secondary/70 flex grow flex-col gap-0.5 lg:flex-row"
          href={`/clients/${token.clientId}`}
        >
          <div className="flex grow flex-col gap-0.5 break-all">
            <p>{tokenStr}</p>
            <p className="text-gray text-sm">{token.clientId}</p>
            <p
              title={scopes}
              className="text-gray dark:text-secondary/60 line-clamp-1 max-w-md text-sm font-light"
            >
              {scopes}
            </p>
          </div>
          <p className="text-gray dark:text-secondary/50 flex items-center py-1 text-sm font-light whitespace-nowrap lg:text-right">
            {expired ? `Expired ${expiresAt}` : `Expires ${expiresAt}`}
          </p>
        </Link>
      </div>
      <ActiveTokenOptions token={token} />
    </li>
  );
}

export async function ActiveTokens() {
  const activeTokens = await getActiveTokens();
  return (
    <TabPanel className="panel" unmount={false}>
      <h2 className="py-2">Active Tokens</h2>
      <ul>
        {activeTokens.map(token => (
          <ActiveTokenView token={token} key={token.id} />
        ))}
      </ul>
    </TabPanel>
  );
}
