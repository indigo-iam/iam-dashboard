import { XCircleIcon } from "@heroicons/react/16/solid";
import { OidcId, SamlId } from "@/models/me";
import { fetchMe } from "@/services/me";
import Button from "@/components/Button";
import Card from "@/components/Card";

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

      {oidcIds
        ? oidcIds.map(oidcId => <OidcIdView key={oidcId.subject} id={oidcId} />)
        : null}
    </>
  );
}

function SamlAccounts(props: Readonly<{ samlIds?: SamlId[] }>) {
  const { samlIds } = props;
  return (
    <>
      <p className="font-bold">SAML</p>
      {samlIds
        ? samlIds.map(samlId => (
            <SamlIdView key={samlId.attributeId} id={samlId} />
          ))
        : null}
    </>
  );
}

async function LinkedAccounts() {
  const me = await fetchMe();
  const { oidcIds, samlIds } = me["urn:indigo-dc:scim:schemas:IndigoUser"];
  return (
    <div className="space-y-2">
      <OidcAccounts oidcIds={oidcIds} />
      <SamlAccounts samlIds={samlIds} />
    </div>
  );
}

export const LinkedAccountsCard = (): JSX.Element => {
  return (
    <Card title="Linked Accounts">
      <LinkedAccounts />
    </Card>
  );
};
