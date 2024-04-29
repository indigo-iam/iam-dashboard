import { Certificate } from "@/models/Me";
import { Card } from "../Card";
import { useMe } from "@/services";

const CertificateView = (props: { cert: Certificate }) => {
  const { cert } = props;
  return (
    <div className="border-bottom pb-2">
      <b>Subject</b> {cert.subjectDn} <br />
      <b>Issuer</b> {cert.issuerDn} <br />
      <b>Last Modified</b> {cert.lastModified}
    </div>
  );
};

const Certificates = async () => {
  const { fetchMe } = useMe();
  const me = await fetchMe();

  if (!me) {
    return null;
  }

  const { certificates } = me["urn:indigo-dc:scim:schemas:IndigoUser"];

  if (certificates && certificates?.length == 0) {
    return "No certificates found";
  }

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
