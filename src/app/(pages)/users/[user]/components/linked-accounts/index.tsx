import { OidcId, SamlId } from "@/models/indigo-user";
import { User } from "@/models/scim";
import { Section, Subsection } from "@/components/layout";
import SAMLOptions from "./saml-options";
import OidcOptions from "./oidc-options";

const OidcIdView = (props: { oidcId: OidcId }) => {
  const { oidcId } = props;
  return (
    <li className="flex flex-row border-b p-2 last:border-0">
      <div className="flex grow flex-col">
        <p>{oidcId.issuer}</p>
        <small className="iam-text-light">{oidcId.subject}</small>
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
    <li className="flex flex-row border-b p-2 last:border-0">
      <div className="flex grow flex-col">
        <p className="iam-text-normal break-all">{samlId.userId}</p>
        <small className="iam-text-light break-all">{samlId.idpId}</small>
        <small className="iam-text-light break-all">{samlId.attributeId}</small>
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
      <p className="iam-text-light p-2">
        No OpenID connect linked accounts found.
      </p>
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
    return <p className="iam-text-light p-2">No linked SAML accounts found.</p>;
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
export default async function LinkedAccounts(
  props: Readonly<LinkedAccountsProps>
) {
  const { user } = props;
  let oidcIds: OidcId[] | undefined = undefined;
  let samlIds: SamlId[] | undefined = undefined;

  if (user["urn:indigo-dc:scim:schemas:IndigoUser"]) {
    oidcIds = user["urn:indigo-dc:scim:schemas:IndigoUser"].oidcIds;
    samlIds = user["urn:indigo-dc:scim:schemas:IndigoUser"].samlIds;
  }
  return (
    <Section title="Linked Accounts">
      <div className="space-y-4">
        <Subsection title="OpenID Connect">
          <OidcAccounts oidcIds={oidcIds} />
        </Subsection>
        <Subsection title="SAML">
          <SamlAccounts samlIds={samlIds} />
        </Subsection>
      </div>
    </Section>
  );
}
