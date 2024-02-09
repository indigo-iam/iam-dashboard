import { Page } from "../../components";
import { useIam, IamUser } from "../../services/IAM";

export const Home = () => {
  const iam = useIam();

  const UserCard = (): JSX.Element => {
    if (!iam.user) {
      return <></>;
    }
    const User = (props: { user: IamUser }) => {
      const { user } = props;
      return (
        <ul>
          <li>
            <b>Email</b> {user.emails[0].value}
          </li>
          <li>
            <b>Status</b> {user.active ? "active" : "disabled"}
          </li>
          <li>
            <b>Created</b> {user.meta.created}
          </li>
          <li>
            <b>Last Modified</b> {user.meta.lastModified}
          </li>
        </ul>
      );
    };
    return (
      <div className="infn-card h-100">
        <div className="infn-title">{iam.user.name.formatted}</div>
        <User user={iam.user} />
      </div>
    );
  };

  const GroupsCard = (): JSX.Element => {
    const Groups = () => {
      if (!iam.user) {
        return null;
      }
      const { groups } = iam.user;
      return (
        <div>
          <p>{groups ? groups : "No groups found"}</p>
        </div>
      );
    };
    return (
      <div className="infn-card">
        <div className="infn-title">Groups</div>
        <Groups />
      </div>
    );
  };

  const GroupRequestsCard = (): JSX.Element => {
    const RequestsCard = () => {
      return "No requests found";
    };
    return (
      <div className="infn-card">
        <div className="infn-title">Group Requests</div>
        <RequestsCard />
      </div>
    );
  };

  const LinkedAccountsCard = (): JSX.Element => {
    const LinkedAccounts = (): JSX.Element => {
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

  const CertificatesCard = (): JSX.Element => {
    const Certificates = (): JSX.Element => {
      const schema = "urn:indigo-dc:scim:schemas:IndigoUser";
      if (
        !iam.user ||
        !iam.user[schema] ||
        iam.user[schema].certificates.length == 0
      ) {
        return <>No certificates found</>;
      }
      const { certificates } = iam.user[schema];

      return (
        <>
          {certificates.map((cert, i) => {
            return (
              <ul key={i}>
                <li>
                  <b>Subject</b> {cert.subjectDn}
                </li>
                <li>
                  <b>Issuer</b> {cert.issuerDn}
                </li>
                <li>
                  <b>Last Modified</b> {cert.lastModified}
                </li>
              </ul>
            );
          })}
        </>
      );
    };
    return (
      <div className="infn-card">
        <div className="infn-title">Certificates</div>
        <Certificates />
      </div>
    );
  };

  return (
    <Page id="home">
      <div className="w-100 container">
        <div className="row p-4">
          <div className="col mt-0">
            <UserCard />
          </div>
          <div className="col">
            <div className="row p-2">
              <GroupsCard />
            </div>
            <div className="row p-2">
              <GroupRequestsCard />
            </div>
          </div>
        </div>
        <div className="row p-4">
          <div className="col">
            <LinkedAccountsCard />
          </div>
          <div className="col">
            <CertificatesCard />
          </div>
        </div>
      </div>
    </Page>
  );
};
