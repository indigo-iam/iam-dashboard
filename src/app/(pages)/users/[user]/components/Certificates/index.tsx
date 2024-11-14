import { User } from "@/models/scim";
import { Certificate } from "@/models/indigo-user";

const CertificateView = (props: { cert: Certificate }) => {
  const { cert } = props;
  return (
    <div className="border-bottom pb-2">
      <div className="grid grid-cols-3 grid-rows-2">
        <div className="col-span-1">
          <b>Subject</b>
        </div>
        <div className="col-span-2 break-words">{cert.subjectDn}</div>
        <div className="col-span-1">
          <b>Issuer</b>
        </div>
        <div className="col-span-2">{cert.issuerDn}</div>
        <div className="col-span-1">
          <b>Last Modified</b>
        </div>
        <div className="col-span-2">{cert.lastModified}</div>
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
