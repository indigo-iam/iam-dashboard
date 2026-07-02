// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { OidcId } from "@/models/indigo-user";
import OidcOptions from "./options";

function OidcIdView(props: { oidcId: OidcId }) {
  const { oidcId } = props;
  return (
    <li className="iam-list-item">
      <div className="flex grow flex-col">
        <p className="text-gray-950 dark:text-gray-100">{oidcId.issuer}</p>
        <p className="text-sm font-light">Subject {oidcId.subject}</p>
      </div>
      <OidcOptions oidcId={oidcId} />
    </li>
  );
}

type OidcAccountsProps = {
  oidcIds: OidcId[];
};

export function OidcAccounts(props: Readonly<OidcAccountsProps>) {
  const { oidcIds } = props;
  return (
    <div className="panel space-y-2">
      <h2>OpenID Connect/OAuth2</h2>
      <ul className="w-full">
        {oidcIds.length === 0 ? (
          <p className="pt-4">There are no linked accounts.</p>
        ) : (
          oidcIds.map(oidcId => (
            <OidcIdView key={oidcId.subject} oidcId={oidcId} />
          ))
        )}
      </ul>
    </div>
  );
}
