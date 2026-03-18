// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { Certificate } from "@/models/indigo-user";
import LinkCertificateButton from "./link-certificate-button";

const CertificateView = (props: { cert: Certificate }) => {
  const { cert } = props;
  const lastModified = cert.lastModified
    ? new Date(cert.lastModified).toLocaleString()
    : "N/A";
  return (
    <div className="iam-list-item flex-col space-y-2">
      <div>
        <p className="text-xs">Subject</p>
        <p className="text-sm">{cert.subjectDn}</p>
      </div>
      <div>
        <p className="text-xs">Issuer</p>
        <p className="text-sm">{cert.issuerDn}</p>
      </div>
      <div>
        <p className="text-xs">Last modified</p>
        <p className="text-xs">{lastModified}</p>
      </div>
    </div>
  );
};

type CertificateProps = {
  user: User;
};

export async function Certificates(props: Readonly<CertificateProps>) {
  const { user } = props;
  let certificates: Certificate[] = [];

  if (user["urn:indigo-dc:scim:schemas:IndigoUser"]) {
    certificates =
      user["urn:indigo-dc:scim:schemas:IndigoUser"].certificates ?? [];
  }

  if (certificates.length === 0) {
    return (
      <div className="panel space-y-2">
        <h2>X509 Certificates</h2>
        <p>No certificates found.</p>
        <LinkCertificateButton user={user} />
      </div>
    );
  }

  return (
    <div className="panel space-y-2">
      <h2>X509 Certificates</h2>
      {certificates.map(cert => (
        <CertificateView key={cert.subjectDn + cert.issuerDn} cert={cert} />
      ))}
      <LinkCertificateButton user={user} />
    </div>
  );
}
