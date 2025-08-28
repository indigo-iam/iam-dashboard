// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { Certificate } from "@/models/indigo-user";
import LinkCertificateButton from "./link-certificate-button";

const CertificateView = (props: { cert: Certificate }) => {
  const { cert } = props;
  return (
    <ul className="flex flex-col">
      <li className="dark:text-light-gray inline-flex gap-1">
        <span className="font-bold">Subject:</span>
        <span>{cert.subjectDn}</span>
      </li>
      <li className="dark:text-light-gray/80 inline-flex gap-1">
        <span className="font-bold">Issuer:</span>
        <span>{cert.issuerDn}</span>
      </li>
      <li className="inline-flex gap-1">
        <span className="dark:text-light-gray/80 font-bold">
          Last modified:
        </span>
        <span>{cert.lastModified}</span>
      </li>
    </ul>
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
        <p className="dark:text-secondary/60 text-gray p-2">
          No certificates found.
        </p>
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
