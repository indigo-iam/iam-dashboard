// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { Certificate } from "@/models/indigo-user";
import LinkCertificateButton from "./link-certificate-button";
import { TabPanel } from "@/components/tabs";

const CertificateView = (props: { cert: Certificate }) => {
  const { cert } = props;
  return (
    <ul className="flex flex-col">
      <li className="inline-flex gap-1">
        <span className="font-bold">Subject:</span>
        <span>{cert.subjectDn}</span>
      </li>
      <li className="inline-flex gap-1">
        <span className="font-bold">Issuer:</span>
        <span>{cert.issuerDn}</span>
      </li>
      <li className="inline-flex gap-1">
        <span className="font-bold">Last modified:</span>
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
  let certificates: Certificate[] | undefined;

  if (user["urn:indigo-dc:scim:schemas:IndigoUser"]) {
    certificates = user["urn:indigo-dc:scim:schemas:IndigoUser"].certificates;
  }

  return (
    <TabPanel className="panel space-y-4">
      <h2 className="border-b">X509 Certificates</h2>
      {certificates && certificates.length > 0 ? (
        certificates.map(cert => (
          <CertificateView key={cert.subjectDn + cert.issuerDn} cert={cert} />
        ))
      ) : (
        <p className="dark:text-extralight font-light">
          No certificates found.
        </p>
      )}
      <LinkCertificateButton user={user} />
    </TabPanel>
  );
}
