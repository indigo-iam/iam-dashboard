// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

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
        <p className="pt-4">There are no linked accounts.</p>
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
