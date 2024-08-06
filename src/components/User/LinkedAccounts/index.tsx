import { XCircleIcon } from "@heroicons/react/16/solid";
import { OidcId, SamlId } from "@/models/scim";
import Button from "@/components/Button";
import { ScimUser } from "@/models/scim";

const OidcIdView = (props: { id: OidcId }) => {
  return (
    <div className="border-bottom container p-2">
      <div className="row">
        <div className="col">
          <b>Issuer:</b> {props.id.issuer}
          <br />
          <b>Subject:</b>
          {props.id.subject}
        </div>
        <div className="col flex flex-row-reverse">
          <Button action="danger" isSmall={true} icon={<XCircleIcon />}>
            Unlink
          </Button>
        </div>
      </div>
    </div>
  );
};

const SamlIdView = (props: { id: SamlId }) => {
  return (
    <div className="flex flex-wrap">
      <div className="max-w-60">
        <p className="break-all">{props.id.idpId}</p>
        <p className="break-all"> {props.id.attributeId}</p>
        <p className="break-all">{props.id.userId}</p>
      </div>
      <div className="ml-auto mr-0">
        <Button action="danger" isSmall={true} icon={<XCircleIcon />}>
          Unlink
        </Button>
      </div>
    </div>
  );
};

function OidcAccounts(props: Readonly<{ oidcIds?: OidcId[] }>) {
  const { oidcIds } = props;
  return (
    <>
      <p className="font-bold">OpenID Connect</p>

      {oidcIds ? (
        oidcIds.map(oidcId => <OidcIdView key={oidcId.subject} id={oidcId} />)
      ) : (
        <p>No OpenID connect linked accounts found.</p>
      )}
    </>
  );
}

function SamlAccounts(props: Readonly<{ samlIds?: SamlId[] }>) {
  const { samlIds } = props;
  return (
    <>
      <p className="font-bold">SAML</p>
      {samlIds ? (
        samlIds.map(samlId => (
          <SamlIdView key={samlId.attributeId} id={samlId} />
        ))
      ) : (
        <p>No linked SAML accounts found.</p>
      )}
    </>
  );
}

type LinkedAccountsProps = {
  user: ScimUser;
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
    <div className="space-y-2">
      <OidcAccounts oidcIds={oidcIds} />
      <SamlAccounts samlIds={samlIds} />
    </div>
  );
}
