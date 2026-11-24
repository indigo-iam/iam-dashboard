// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { GlobeAltIcon } from "@heroicons/react/24/outline";

import { OidcId } from "@/models/indigo-user";
import { Panel } from "@/components/layout";
import { ListItem, UnorderedList } from "@/components/list";

import OidcOptions from "./options";

type OidcIdViewProps = {
  userId: string;
  oidcId: OidcId;
};

function OidcIdView(props: Readonly<OidcIdViewProps>) {
  const { userId, oidcId } = props;
  return (
    <ListItem>
      <div className="flex grow flex-col">
        <p className="text-gray-950 dark:text-gray-100">{oidcId.issuer}</p>
        <p className="text-sm font-light">{oidcId.subject}</p>
      </div>
      <OidcOptions userId={userId} oidcId={oidcId} />
    </ListItem>
  );
}

type OidcAccountsProps = {
  userId: string;
  userFormattedName: string;
  oidcIds: OidcId[];
  isAdmin: boolean;
};

export function OidcAccounts(props: Readonly<OidcAccountsProps>) {
  const { userId, oidcIds } = props;
  if (oidcIds.length === 0) {
    return (
      <Panel>
        <h2>OpenID Connect/OAuth2</h2>
        <div>
          <GlobeAltIcon className="mx-auto size-12 text-slate-500 dark:text-gray-300" />
          <p className="p-2 text-center text-sm">
            There is no external account linked to your profile.
          </p>
        </div>
      </Panel>
    );
  }
  return (
    <Panel>
      <div className="flex gap-2">
        <h2 className="grow">OpenID Connect/OAuth2</h2>
      </div>
      <UnorderedList>
        {oidcIds.map(oidcId => (
          <OidcIdView key={oidcId.subject} userId={userId} oidcId={oidcId} />
        ))}
      </UnorderedList>
    </Panel>
  );
}
