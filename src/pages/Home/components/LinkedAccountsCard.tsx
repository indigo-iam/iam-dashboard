import { useIam, OidcId, SamlId } from "../../../services/IAM";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { Button } from "../../../components";
import { Card } from "./Card";

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
                icon={<XCircleIcon />}
                style={{ height: "32px" }}
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
                color="danger"
                className="my-auto"
                icon={<XCircleIcon />}
                style={{ height: "32px" }}
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
        <b>OpenID Connect</b>
        <br />
        {oidcIds.map(oidcId => (
          <OidcIdView key={oidcId.subject} id={oidcId} />
        ))}
        <b>SAML</b>
        <br />
        {samlIds.map((samlId, i) => (
          <SamlIdView key={`saml-id-${i}`} id={samlId} />
        ))}
      </div>
    );
  };

  return (
    <Card title="Linked Accounts">
      <LinkedAccounts />
    </Card>
  );
};
