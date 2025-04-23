// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { OidcId, SamlId } from "@/models/indigo-user";
import { User } from "@/models/scim";
import { Section } from "@/components/layout";
import SAMLOptions from "./saml-options";
import OidcOptions from "./oidc-options";
import { TabPanel } from "@/components/tabs";

const OidcIdView = (props: { oidcId: OidcId }) => {
  const { oidcId } = props;
  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow flex-col">
        <p>{oidcId.issuer}</p>
        <small className="font-light">{oidcId.subject}</small>
      </div>
      <div className="flex flex-col">
        <OidcOptions oidcId={oidcId} />
      </div>
    </li>
  );
};

const SamlIdView = (props: { samlId: SamlId }) => {
  const { samlId } = props;
  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow flex-col">
        <p className="break-all">{samlId.userId}</p>
        <small className="break-all">{samlId.idpId}</small>
        <small className="break-all">{samlId.attributeId}</small>
      </div>
      <div className="flex flex-col">
        <SAMLOptions />
      </div>
    </li>
  );
};

function OidcAccounts(props: Readonly<{ oidcIds?: OidcId[] }>) {
  const { oidcIds } = props;
  if (!oidcIds || oidcIds.length === 0) {
    return (
      <p className="p-2 font-light">No OpenID connect linked accounts found.</p>
    );
  }
  return (
    <ul className="w-full">
      {oidcIds.map(oidcId => (
        <OidcIdView key={oidcId.subject} oidcId={oidcId} />
      ))}
    </ul>
  );
}

function SamlAccounts(props: Readonly<{ samlIds?: SamlId[] }>) {
  const { samlIds } = props;
  if (!samlIds || samlIds.length === 0) {
    return <p className="p-2 font-light">No linked SAML accounts found.</p>;
  }
  return (
    <ul className="w-full">
      {samlIds.map(samlId => (
        <SamlIdView key={samlId.attributeId} samlId={samlId} />
      ))}
    </ul>
  );
}

type LinkedAccountsProps = {
  user: User;
};
export async function LinkedAccounts(props: Readonly<LinkedAccountsProps>) {
  const { user } = props;
  let oidcIds: OidcId[] | undefined = undefined;
  let samlIds: SamlId[] | undefined = undefined;

  if (user["urn:indigo-dc:scim:schemas:IndigoUser"]) {
    oidcIds = user["urn:indigo-dc:scim:schemas:IndigoUser"].oidcIds;
    samlIds = user["urn:indigo-dc:scim:schemas:IndigoUser"].samlIds;
  }
  return (
    <TabPanel className="space-y-6">
      <Section title="OpenID Connect">
        <OidcAccounts oidcIds={oidcIds} />
      </Section>
      <Section title="SAML">
        <SamlAccounts samlIds={samlIds} />
      </Section>
    </TabPanel>
  );
}
