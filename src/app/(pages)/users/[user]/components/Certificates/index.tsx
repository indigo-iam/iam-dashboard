import { User } from "@/models/scim";
import { Certificate } from "@/models/indigo-user";
import InfoTable from "@/components/InfoTable";

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
export const Certificates = async (props: Readonly<CertificateProps>) => {
  const { user } = props;
  let certificates: Certificate[] | undefined;

  if (user["urn:indigo-dc:scim:schemas:IndigoUser"]) {
    certificates = user["urn:indigo-dc:scim:schemas:IndigoUser"].certificates;
  }

  if (!certificates || certificates?.length == 0) {
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
