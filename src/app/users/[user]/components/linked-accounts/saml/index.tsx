// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { BuildingLibraryIcon } from "@heroicons/react/24/outline";

import { SamlId } from "@/models/indigo-user";
import { Panel } from "@/components/layout";
import { ListItem, UnorderedList } from "@/components/list";

import SAMLOptions from "./options";

type SamlIdViewProps = {
  userId: string;
  samlId: SamlId;
};

function SamlIdView(props: Readonly<SamlIdViewProps>) {
  const { userId, samlId } = props;
  return (
    <ListItem>
      <div className="flex grow flex-col">
        <p className="break-all text-gray-950 dark:text-gray-100">
          {samlId.idpId}
        </p>
        <p className="text-sm font-light">{samlId.userId}</p>
        <p className="text-sm font-light">{samlId.attributeId}</p>
      </div>
      <SAMLOptions userId={userId} samlId={samlId} />
    </ListItem>
  );
}

type SamlAccountsProps = {
  userId: string;
  samlIds: SamlId[];
};

export function SamlAccounts(props: Readonly<SamlAccountsProps>) {
  const { userId, samlIds } = props;
  if (samlIds.length === 0) {
    return (
      <Panel>
        <h2>SAML</h2>
        <div>
          <BuildingLibraryIcon className="mx-auto size-12 text-gray-400" />
          <p className="p-2 text-center text-sm">
            There is no external account linked to your profile.
          </p>
        </div>
      </Panel>
    );
  }
  return (
    <Panel>
      <h2>SAML</h2>
      <UnorderedList>
        {samlIds.map(samlId => (
          <SamlIdView
            key={samlId.attributeId}
            userId={userId}
            samlId={samlId}
          />
        ))}
      </UnorderedList>
    </Panel>
  );
}
