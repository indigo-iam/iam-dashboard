// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Certificate } from "@/models/indigo-user";
import LinkCertificateButton from "./link-certificate-button";
import CertificateOptions from "./options";

type CertificateViewProps = {
  userId: string;
  userFormattedName: string;
  cert: Certificate;
};

function CertificateView(props: Readonly<CertificateViewProps>) {
  const { userId, userFormattedName, cert } = props;
  return (
    <div className="iam-list-item items-center">
      <div className="grow space-y-2">
        <p className="text-gray-950 dark:text-gray-200">{cert.display}</p>
        <div className="flex flex-col gap-0.5">
          <p className="text-xs">Subject {cert.subjectDn}</p>
          <p className="text-xs">Issuer {cert.issuerDn}</p>
        </div>
      </div>
      <CertificateOptions
        userId={userId}
        userFormattedName={userFormattedName}
        certificate={cert}
      />
    </div>
  );
}

type CertificateProps = {
  userId: string;
  userName: string;
  userFormattedName: string;
  certificates: Certificate[];
  isAdmin: boolean;
};

export async function Certificates(props: Readonly<CertificateProps>) {
  const { userId, userName, userFormattedName, certificates, isAdmin } = props;
  return (
    <div className="panel space-y-2">
      <div className="flex justify-between">
        <h2>X509 Certificates</h2>
        {isAdmin && <LinkCertificateButton userName={userName} />}
      </div>
      {certificates.length === 0 ? (
        <p>There are not linked certificates.</p>
      ) : (
        certificates.map(cert => (
          <CertificateView
            key={cert.subjectDn + cert.issuerDn}
            userId={userId}
            userFormattedName={userFormattedName}
            cert={cert}
          />
        ))
      )}
    </div>
  );
}
