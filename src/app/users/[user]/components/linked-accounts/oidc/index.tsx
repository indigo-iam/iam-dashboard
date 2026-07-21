// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { OidcId } from "@/models/indigo-user";
import OidcOptions from "./options";
import { LinkAccountButton } from "./link-account";

type OidcIdViewProps = {
  userId: string;
  oidcId: OidcId;
};

function OidcIdView(props: Readonly<OidcIdViewProps>) {
  const { userId, oidcId } = props;
  return (
    <li className="iam-list-item">
      <div className="flex grow flex-col">
        <p className="text-gray-950 dark:text-gray-100">{oidcId.issuer}</p>
        <p className="text-sm font-light">Subject {oidcId.subject}</p>
      </div>
      <OidcOptions userId={userId} oidcId={oidcId} />
    </li>
  );
}

type OidcAccountsProps = {
  userId: string;
  userFormattedName: string;
  oidcIds: OidcId[];
  isAdmin: boolean;
};

export function OidcAccounts(props: Readonly<OidcAccountsProps>) {
  const { userId, userFormattedName, oidcIds, isAdmin } = props;
  return (
    <div className="panel space-y-2">
      <div className="flex gap-2">
        <h2 className="grow">OpenID Connect/OAuth2</h2>
        {isAdmin && (
          <LinkAccountButton
            userId={userId}
            userFormattedName={userFormattedName}
          />
        )}
      </div>
      <ul className="w-full">
        {oidcIds.length === 0 ? (
          <p className="pt-4">There are no linked accounts.</p>
        ) : (
          oidcIds.map(oidcId => (
            <OidcIdView key={oidcId.subject} userId={userId} oidcId={oidcId} />
          ))
        )}
      </ul>
    </div>
  );
}
