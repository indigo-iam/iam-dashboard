import { XCircleIcon } from "@heroicons/react/16/solid";
import { useIam, OidcId, SamlId } from "@services/IAM";
import { Button } from "@components";
import { Card } from "../Card";

export const LinkedAccountsCard = (): JSX.Element => {
  const LinkedAccounts = (): JSX.Element => {
    const iam = useIam();
    if (!iam.user) {
      return <></>;
    }

    const OidcIdView = (props: { id: OidcId }) => {
      return (
        <div className="container border-bottom p-2">
          <div className="row">
            <div className="col">
              <b>Issuer:</b> {props.id.issuer}
              <br />
              <b>Subject:</b>
              {props.id.subject}
            </div>
            <div className="col d-flex flex-row-reverse">
              <Button
                color="danger"
                className="my-auto"
                small={true}
                icon={<XCircleIcon />}
              >
                Unlink
              </Button>
            </div>
          </div>
        </div>
      );
    };

    const SamlIdView = (props: { id: SamlId }) => {
      return (
        <div className="container border-bottom p-2">
          <div className="row">
            <div className="col">
              {props.id.idpId}
              <br />
              {props.id.attributeId}
              <br />
              {props.id.userId}
            </div>
            <div className="col d-flex flex-row-reverse">
              <Button
                className="my-auto"
                color="danger"
                small={true}
                icon={<XCircleIcon />}
              >
                Unlink
              </Button>
            </div>
          </div>
        </div>
      );
    };

    const { oidcIds, samlIds } =
      iam.user["urn:indigo-dc:scim:schemas:IndigoUser"];
    return (
      <div>
        <div>
          <div>
            <b>OpenID Connect</b>
          </div>
          {oidcIds
            ? oidcIds.map(oidcId => (
                <OidcIdView key={oidcId.subject} id={oidcId} />
              ))
            : null}
        </div>
        <div>
          <div className="pt-3">
            <b>SAML</b>
          </div>
          {samlIds
            ? samlIds.map((samlId, i) => (
                <SamlIdView key={`saml-id-${i}`} id={samlId} />
              ))
            : null}
        </div>
      </div>
    );
  };

  return (
    <Card title="Linked Accounts">
      <LinkedAccounts />
    </Card>
  );
};
