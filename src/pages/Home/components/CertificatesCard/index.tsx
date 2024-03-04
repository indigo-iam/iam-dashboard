import { useIam, Certificate } from "@services/IAM";
import { Card } from "../Card";

const CertificateView = (props: { cert: Certificate }) => {
  const { cert } = props;
  return (
    <div className="border-bottom pb-2">
      <b>Subject</b>
      {cert.subjectDn} <br />
      <b>Issuer</b> {cert.issuerDn} <br />
      <b>Last Modified</b> {cert.lastModified}
    </div>
  );
};

const Certificates = (): JSX.Element => {
  const iam = useIam();
  const schema = "urn:indigo-dc:scim:schemas:IndigoUser";

  if (!iam.user) {
    return <div />;
  }

  if (iam.user[schema].certificates?.length == 0) {
    return <>No certificates found</>;
  }

  const { certificates } = iam.user[schema];
  return (
    <>
      {certificates?.map(cert => {
        return (
          <CertificateView key={cert.subjectDn + cert.issuerDn} cert={cert} />
        );
      })}
    </>
  );
};

export const CertificatesCard = (): JSX.Element => {
  return (
    <Card title="Certificates">
      <Certificates />
    </Card>
  );
};
