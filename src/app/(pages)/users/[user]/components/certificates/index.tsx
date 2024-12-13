import { User } from "@/models/scim";
import { Certificate } from "@/models/indigo-user";
import InfoTable from "@/components/info-table";
import { Section } from "@/components/layout";
import LinkCertificateButton from "./link-certificate-button";

const CertificateView = (props: { cert: Certificate }) => {
  const { cert } = props;
  const data = [
    { name: "Subject", value: cert.subjectDn },
    { name: "Issuer", value: cert.issuerDn },
    { name: "Last Modified", value: cert.lastModified },
  ];
  return <InfoTable data={data} />;
};

type CertificateProps = {
  user: User;
};

export default async function Certificates(props: Readonly<CertificateProps>) {
  const { user } = props;
  let certificates: Certificate[] | undefined;

  if (user["urn:indigo-dc:scim:schemas:IndigoUser"]) {
    certificates = user["urn:indigo-dc:scim:schemas:IndigoUser"].certificates;
  }

  return (
    <Section title="X509 Certificates">
      {certificates && certificates.length > 0 ? (
        certificates.map(cert => (
          <CertificateView key={cert.subjectDn + cert.issuerDn} cert={cert} />
        ))
      ) : (
        <p>No certificates found.</p>
      )}
      <LinkCertificateButton user={user} />
    </Section>
  );
}
