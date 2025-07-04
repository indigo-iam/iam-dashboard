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
  return scopes.map(s => (
    <li className="iam-list-item" key={s.id}>
      <div className="flex grow flex-col">
        <p>{s.value}</p>
        <p className="text-gray dark:text-secondary/60 line-clamp-1 text-sm">
          {s.description}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <ScopeOptions client={client} scope={s.value} />
      </div>
    </li>
  ));
}

type CustomScopesProps = {
  client: Client;
  scopes: string[];
};

async function CustomScopes(props: Readonly<CustomScopesProps>) {
  const { client, scopes } = props;
  return scopes.map(s => (
    <li className="iam-list-item items-center" key={s}>
      <span className="flex grow font-bold">{s}</span>
      <ScopeOptions client={client} scope={s} />
    </li>
  ));
}

type ScopesProps = {
  client: Client;
};

export default async function Scopes(props: Readonly<ScopesProps>) {
  const { client } = props;
  const systemScopes = await fetchScopes();
  const systemScopeNames = systemScopes.map(s => s.value);
  const clientScopeNames = client.scope?.split(" ") ?? [];
  const customScopesNames = clientScopeNames.filter(
    s => !systemScopeNames.includes(s)
  );
  const clientSystemScopes = systemScopes.filter(s =>
    clientScopeNames.includes(s.value)
  );
  const unusedSystemScopes = systemScopes.filter(
    s => !clientScopeNames.includes(s.value)
  );

  return (
    <TabPanel className="space-y-4" unmount={false}>
      <div className="flex flex-wrap gap-2">
        <AddScopeButton client={client} scopes={unusedSystemScopes} />
        <AddCustomScope client={client} />
      </div>
      <ul className="panel flex flex-col gap-2">
        <SystemScopes client={client} scopes={clientSystemScopes} />
        <CustomScopes client={client} scopes={customScopesNames} />
      </ul>
    </TabPanel>
  );
}
