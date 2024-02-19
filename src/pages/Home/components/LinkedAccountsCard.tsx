import { useIam } from "../../../services/IAM";

export const LinkedAccountsCard = (): JSX.Element => {
  const LinkedAccounts = (): JSX.Element => {
    const iam = useIam();
    if (!iam.user) {
      return <></>;
    }
    const { samlIds } = iam.user["urn:indigo-dc:scim:schemas:IndigoUser"];
    return (
      <div>
        {samlIds.map(el => {
          return (
            <ul key={el.idpId}>
              <li>
                <b>User Id</b> {el.userId}
              </li>
              <li>
                <b>Idp Id</b> {el.idpId}
              </li>
              <li>
                <b>Attribute Id</b> {el.attributeId}
              </li>
            </ul>
          );
        })}
      </div>
    );
  };
  return (
    <div className="infn-card">
      <div className="infn-title">Linked Accounts</div>
      <LinkedAccounts />
    </div>
  );
};
