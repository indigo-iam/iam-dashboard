// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { Client, Scope } from "@/models/client";
import { fetchScopes } from "@/services/scopes";
import { ScopeOptions } from "./options";
import { AddScopeButton } from "./add-system-scopes";
import { AddCustomScope } from "./add-custom-scope";

type SystemScopesProps = {
  client: Client;
  scopes: Scope[];
};

async function SystemScopes(props: Readonly<SystemScopesProps>) {
  const { client, scopes } = props;
  return (
    <ul>
      {scopes.map(s => (
        <li className="iam-list-item" key={s.id}>
          <div className="flex grow flex-col">
            <span className="font-bold">{s.value}</span>
            <span className="dark:text-secondary line-clamp-1 text-xs font-light">
              {s.description}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <ScopeOptions client={client} scope={s.value} />
          </div>
        </li>
      ))}
    </ul>
  );
}

type ScopesProps = {
  client: Client;
};

export default async function Scopes(props: Readonly<ScopesProps>) {
  const { client } = props;
  const clientScopes = client.scope?.split(" ") ?? [];
  const systemScopes = await fetchScopes();
  const clientSystemScopes = systemScopes.filter(s =>
    clientScopes.includes(s.value)
  );
  const unusedSystemScopes = systemScopes.filter(
    s => !clientScopes.includes(s.value)
  );

  return (
    <TabPanel className="panel flex flex-col gap-2" unmount={false}>
      <div className="flex flex-wrap gap-2">
        <AddScopeButton client={client} scopes={unusedSystemScopes} />
        <AddCustomScope client={client} />
      </div>
      <SystemScopes client={client} scopes={clientSystemScopes} />
    </TabPanel>
  );
}
