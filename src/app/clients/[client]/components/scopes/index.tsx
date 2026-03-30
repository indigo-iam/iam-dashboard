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
  isAdmin: boolean;
};

async function SystemScopes(props: Readonly<SystemScopesProps>) {
  const { client, scopes, isAdmin } = props;
  return scopes.map(s => (
    <li className="iam-list-item" key={s.id}>
      <div className="flex grow flex-col">
        <p className="text-gray-950 dark:text-gray-200">{s.value}</p>
        <p className="text-xs">{s.description}</p>
      </div>
      <div className="flex flex-col items-center">
        <ScopeOptions client={client} scope={s.value} isAdmin={isAdmin} />
      </div>
    </li>
  ));
}

type CustomScopesProps = {
  client: Client;
  scopes: string[];
  isAdmin: boolean;
};

async function CustomScopes(props: Readonly<CustomScopesProps>) {
  const { client, scopes, isAdmin } = props;
  return scopes.map(s => (
    <li className="iam-list-item" key={s}>
      <div className="flex grow flex-col">
        <p className="text-gray-950 dark:text-gray-200">{s}</p>
        <p className="text-xs">(custom scope)</p>
      </div>
      <div className="flex flex-col items-center">
        <ScopeOptions client={client} scope={s} isAdmin={isAdmin} />
      </div>
    </li>
  ));
}

type ScopesProps = {
  client: Client;
  isAdmin: boolean;
};

export default async function Scopes(props: Readonly<ScopesProps>) {
  const { client, isAdmin } = props;
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
    <TabPanel className="panel space-y-4" unmount={false}>
      <div className="flex flex-wrap items-center">
        <h3 className="grow py-2">Active scopes</h3>
        <div className="inline-block">
          <div className="flex gap-2">
            <AddScopeButton
              client={client}
              isAdmin={isAdmin}
              scopes={unusedSystemScopes}
            />
            <AddCustomScope client={client} isAdmin={isAdmin} />
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        <SystemScopes
          client={client}
          scopes={clientSystemScopes}
          isAdmin={isAdmin}
        />
        <CustomScopes
          client={client}
          scopes={customScopesNames}
          isAdmin={isAdmin}
        />
      </ul>
    </TabPanel>
  );
}
