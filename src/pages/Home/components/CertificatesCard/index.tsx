import { useIam, Certificate } from "@services/IAM";
import { Card } from "../Card";

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

    return (
      <>
        {certificates.map((cert, i) => {
          return <CertificateView key={`cert-id-${i}`} cert={cert} />;
        })}
      </>
    );
  };
  return (
    <Card title="Certificates">
      <Certificates />
    </Card>
  );
};
