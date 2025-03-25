import { XCircleIcon } from "@heroicons/react/16/solid";
import { OidcId, SamlId } from "@/models/indigo-user";
import { User } from "@/models/scim";
import { Button } from "@/components/buttons";
import { Section, Subsection } from "@/components/layout";
import SAMLOptions from "./saml-options";

const OidcIdView = (props: { id: OidcId }) => {
  return (
    <tr className="tbl-tr">
      <td className="p-2">
        <b>Issuer:</b> {props.id.issuer}
        <br />
        <b>Subject:</b>
        {props.id.subject}
      </td>
      <td className="text-right">
        <Button action="danger" isSmall={true} icon={<XCircleIcon />}>
          Unlink
        </Button>
      </td>
    </tr>
  );
};

const SamlIdView = (props: { id: SamlId }) => {
  return (
    <tr className="tbl-tr">
      <td className="p-2">
        <p className="iam-text-normal break-all">{props.id.userId}</p>
        <p className="iam-text-light break-all">{props.id.idpId}</p>
        <p className="iam-text-light break-all"> {props.id.attributeId}</p>
      </td>
      <td className="text-right">
        <SAMLOptions />
      </td>
    </tr>
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
    <table className="w-full">
      <tbody>
        {oidcIds.map(oidcId => (
          <OidcIdView key={oidcId.subject} id={oidcId} />
        ))}
      </tbody>
    </table>
  );
}

function SamlAccounts(props: Readonly<{ samlIds?: SamlId[] }>) {
  const { samlIds } = props;
  if (!samlIds || samlIds.length === 0) {
    return <p className="iam-text-light p-2">No linked SAML accounts found.</p>;
  }
  return (
    <table className="w-full">
      <tbody>
        {samlIds.map(samlId => (
          <SamlIdView key={samlId.attributeId} id={samlId} />
        ))}
      </tbody>
    </table>
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
