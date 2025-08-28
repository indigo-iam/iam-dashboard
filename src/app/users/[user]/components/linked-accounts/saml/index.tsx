// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { SamlId } from "@/models/indigo-user";
import { User } from "@/models/scim";
import SAMLOptions from "./options";

function SamlIdView(props: { samlId: SamlId }) {
  const { samlId } = props;
  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow flex-col">
        <p className="break-all">{samlId.idpId}</p>
        <p className="text-gray dark:text-secondary/60 text-sm break-all">
          {samlId.userId}
        </p>
        <p className="text-gray dark:text-secondary/60 text-sm break-all">
          {samlId.attributeId}
        </p>
      </div>
      <SAMLOptions samlId={samlId} />
    </li>
  );
}

type SamlAccountsProps = {
  user: User;
};

export function SamlAccounts(props: Readonly<SamlAccountsProps>) {
  const { user } = props;
  const samlIds = user["urn:indigo-dc:scim:schemas:IndigoUser"]?.samlIds ?? [];
  if (samlIds.length === 0) {
    return (
      <div className="panel space-y-2">
        <h2>SAML</h2>
        <p className="text-gray dark:text-secondary/60 p-2">
          No linked SAML accounts found.
        </p>
      </div>
    );
  }
  return (
    <div className="panel space-y-2">
      <h2>SAML</h2>
      {samlIds.map(samlId => (
        <SamlIdView key={samlId.attributeId} samlId={samlId} />
      ))}
    </div>
  );
}
