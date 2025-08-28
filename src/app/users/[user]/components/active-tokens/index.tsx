// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import TabPanel from "@/components/tabs/tab-panel";
import { ActiveToken } from "@/models/sites";
import { getActiveTokens } from "@/services/sites";
import { dateToHuman } from "@/utils/dates";
import Link from "next/link";
import { ActiveTokenOptions } from "./options";

type ActiveTokenViewProps = {
  token: ActiveToken;
};

function ActiveTokenView(props: Readonly<ActiveTokenViewProps>) {
  const { token } = props;
  const scopes = token.scopes.join(" ");
  const expireDate = dateToHuman(new Date(token.expiration));
  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow">
        <div className="flex grow flex-col gap-0.5 break-all">
          {token.value?.slice(0, 5)}...
          <div className="flex flex-col">
            <Link
              className="text-gray dark:text-secondary/70 text-sm hover:underline"
              href={`/clients/${token.clientId}`}
            >
              {token.clientId}
              <p
                title={scopes}
                className="text-gray dark:text-secondary/60 line-clamp-1 text-sm"
              >
                {scopes}
              </p>
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 px-2 lg:flex-col lg:items-end lg:justify-center">
          <p className="text-gray dark:text-secondary/50 text-sm whitespace-nowrap sm:text-right">
            Expires {expireDate}
          </p>
        </div>
      </div>
      <ActiveTokenOptions token={token} />
    </li>
  );
}

export async function ActiveTokens() {
  const activeTokens = await getActiveTokens();
  return (
    <TabPanel className="panel">
      <h2>Active Tokens</h2>
      <ul>
        {activeTokens.map(token => (
          <ActiveTokenView token={token} key={token.id} />
        ))}
      </ul>
    </TabPanel>
  );
}
