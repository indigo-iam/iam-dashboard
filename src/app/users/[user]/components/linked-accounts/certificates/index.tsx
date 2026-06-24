// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Certificate } from "@/models/indigo-user";
import LinkCertificateButton from "./link-certificate-button";
import CertificateOptions from "./options";

type CertificateViewProps = {
  cert: Certificate;
};

function CertificateView(props: Readonly<CertificateViewProps>) {
  const { cert } = props;
  return (
    <div className="iam-list-item">
      <div className="grow space-y-2">
        <p className="text-gray-950 dark:text-gray-200">{cert.display}</p>
        <div className="flex flex-col gap-0.5">
          <p className="text-xs">Subject {cert.subjectDn}</p>
          <p className="text-xs">Issuer {cert.issuerDn}</p>
        </div>
      </div>
      <CertificateOptions />
    </div>
  );
}

type CertificateProps = {
  userName: string;
  certificates: Certificate[];
};

export async function Certificates(props: Readonly<CertificateProps>) {
  const { userName, certificates } = props;
  if (certificates.length === 0) {
    return (
      <div className="panel space-y-2">
        <h2>X509 Certificates</h2>
        <p>No certificates found.</p>
        <LinkCertificateButton userName={userName} />
      </div>
    );
  }

  return (
    <div className="panel space-y-2">
      <h2>X509 Certificates</h2>
      {certificates.map(cert => (
        <CertificateView key={cert.subjectDn + cert.issuerDn} cert={cert} />
      ))}
      <LinkCertificateButton userName={userName} />
    </div>
  );
}
