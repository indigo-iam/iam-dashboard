import { User } from "@/models/scim";
import { Certificate } from "@/models/indigo-user";

const CertificateView = (props: { cert: Certificate }) => {
  const { cert } = props;
  return (
    <div className="border-bottom pb-2">
      <div className="flex">
        <div className="min-w-28">
          <b>Subject</b>
        </div>
        <div>{cert.subjectDn}</div>
      </div>
      <div className="flex">
        <div className="min-w-28">
          <b>Issuer</b>
        </div>
        <div>{cert.issuerDn}</div>
      </div>
      <div className="flex">
        <div className="min-w-28">
          <b>Last Modified</b>
        </div>
        <div>{cert.lastModified}</div>
      </div>
    </div>
  );
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
