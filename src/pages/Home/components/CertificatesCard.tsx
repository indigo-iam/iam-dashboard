import { useIam } from "../../../services/IAM";

export const CertificatesCard = (): JSX.Element => {
  const Certificates = (): JSX.Element => {
    const iam = useIam();
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
