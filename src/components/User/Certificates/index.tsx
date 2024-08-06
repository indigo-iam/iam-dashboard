import { Certificate, ScimUser } from "@/models/scim";

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

type CertificateProps = {
  user: ScimUser;
};
export const Certificates = async (props: Readonly<CertificateProps>) => {
  const { user } = props;
  let certificates: Certificate[] | undefined;

  if (user["urn:indigo-dc:scim:schemas:IndigoUser"]) {
    certificates = user["urn:indigo-dc:scim:schemas:IndigoUser"].certificates;
  }

  if (certificates && certificates?.length == 0) {
    return <p>No certificates found.</p>;
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
