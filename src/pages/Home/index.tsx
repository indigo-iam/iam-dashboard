import { Page } from "../../components";
import { useIam } from "../../services/IAM";

export const Home = () => {
  const iam = useIam();

  const UserCard = (): JSX.Element => {
    const User = () => {
      if (!iam.user) {
        return null;
      }
      return (
        <div>
          <h3>{iam.user.name.formatted}</h3>
          <br />
          <p>Email: {iam.user.emails[0].value}</p>
          <p>Status: {iam.user.active ? "active" : "disabled"}</p>
          <p>Created: {iam.user.meta.created}</p>
          <p>Last Modified: {iam.user.meta.lastModified}</p>
        </div>
      );
    };
    return (
      <div>
        <User />
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
      <div>
        <h3>Groups</h3>
        <Groups />
      </div>
    );
  };

  const GroupRequestsCard = (): JSX.Element => {
    const RequestsCard = () => {
      return "No requests found";
    };
    return (
      <div>
        <h3>Group Requests</h3>
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
              <div key={el.idpId}>
                <p>{el.userId}</p>
                <p>{el.idpId}</p>
                <p>{el.attributeId}</p>
                <br />
              </div>
            );
          })}
        </div>
      );
    };
    return (
      <div>
        <h3>Linked Accounts</h3>
        <LinkedAccounts />
      </div>
    );
  };

  const CertificatesCard = (): JSX.Element => {
    const Certificates = (): JSX.Element => {
      if (
        !iam.user ||
        !iam.user["urn:indigo-dc:scim:schemas:IndigoUser"] ||
        iam.user["urn:indigo-dc:scim:schemas:IndigoUser"].certificates.length ==
          0
      ) {
        return <>No certificates found</>;
      }
      const { certificates } =
        iam.user["urn:indigo-dc:scim:schemas:IndigoUser"];

      return (
        <>
          {certificates.map((cert, i) => {
            return (
              <div key={i}>
                <p>Subject: {cert.subjectDn}</p>
                <p>Issuer: {cert.issuerDn}</p>
                <p>Last Modified: {cert.lastModified}</p>
                <br />
              </div>
            );
          })}
        </>
      );
    };
    return (
      <div>
        <h3>Certificates</h3>
        <Certificates />
      </div>
    );
  };

  return (
    <Page id="home">
      <div>
        <UserCard />
        <GroupsCard />
        <GroupRequestsCard />
        <LinkedAccountsCard />
        <CertificatesCard />
      </div>
    </Page>
  );
};
