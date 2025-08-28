// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { OidcId } from "@/models/indigo-user";
import { User } from "@/models/scim";
import OidcOptions from "./options";

function OidcIdView(props: { oidcId: OidcId }) {
  const { oidcId } = props;
  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow flex-col">
        <p>{oidcId.issuer}</p>
        <p className="dark:text-secondary/60 text-sm">id: {oidcId.subject}</p>
      </div>
      <OidcOptions oidcId={oidcId} />
    </li>
  );
}

type OidcAccountsProps = {
  user: User;
};

export function OidcAccounts(props: Readonly<OidcAccountsProps>) {
  const { user } = props;
  const oidcIds = user["urn:indigo-dc:scim:schemas:IndigoUser"]?.oidcIds ?? [];
  if (oidcIds.length === 0) {
    return (
      <div className="panel space-y-2">
        <h2>OpenID Connect</h2>
        <p className="text-gray dark:text-secondary/60 p-2">
          No OpenID connect linked accounts found.
        </p>
      </div>
    );
  }
  return (
    <div className="panel space-y-2">
      <h2>OpenID Connect</h2>
      <ul className="w-full">
        {oidcIds.map(oidcId => (
          <OidcIdView key={oidcId.subject} oidcId={oidcId} />
        ))}
      </ul>
    </div>
  );
}
