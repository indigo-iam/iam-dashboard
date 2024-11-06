import { XCircleIcon } from "@heroicons/react/16/solid";
import { OidcId, SamlId } from "@/models/indigo-user";
import { User } from "@/models/scim";
import { Button } from "@/components/Buttons";
import { Subsection } from "@/components/Section";

const OidcIdView = (props: { id: OidcId }) => {
  return (
    <tr>
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
    <tr>
      <td className="p-2">
        <p className="break-all">{props.id.idpId}</p>
        <p className="break-all"> {props.id.attributeId}</p>
        <p className="break-all">{props.id.userId}</p>
      </td>
      <td className="text-right">
        <Button action="danger" isSmall={true} icon={<XCircleIcon />}>
          Unlink
        </Button>
      </td>
    </tr>
  );
};

function OidcAccounts(props: Readonly<{ oidcIds?: OidcId[] }>) {
  const { oidcIds } = props;
  if (!oidcIds || oidcIds.length === 0) {
    return <p className="p-2">No OpenID connect linked accounts found.</p>;
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
    return <p className="p-2">No linked SAML accounts found.</p>;
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
export async function LinkedAccounts(props: Readonly<LinkedAccountsProps>) {
  const { user } = props;
  let oidcIds: OidcId[] | undefined = undefined;
  let samlIds: SamlId[] | undefined = undefined;

  if (user["urn:indigo-dc:scim:schemas:IndigoUser"]) {
    oidcIds = user["urn:indigo-dc:scim:schemas:IndigoUser"].oidcIds;
    samlIds = user["urn:indigo-dc:scim:schemas:IndigoUser"].samlIds;
  }
  return (
    <div className="space-y-4">
      <Subsection title="OpenID Connect">
        <OidcAccounts oidcIds={oidcIds} />
      </Subsection>
      <Subsection title="SAML">
        <SamlAccounts samlIds={samlIds} />
      </Subsection>
    </div>
  );
}
