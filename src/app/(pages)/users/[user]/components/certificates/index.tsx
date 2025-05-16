// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { Certificate } from "@/models/indigo-user";
import InfoTable from "@/components/info-table";
import { Section } from "@/components/layout";
import LinkCertificateButton from "./link-certificate-button";
import { TabPanel } from "@/components/tabs";

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

export async function Certificates(props: Readonly<CertificateProps>) {
  const { user } = props;
  let certificates: Certificate[] | undefined;

  if (user["urn:indigo-dc:scim:schemas:IndigoUser"]) {
    certificates = user["urn:indigo-dc:scim:schemas:IndigoUser"].certificates;
  }

  return (
    <TabPanel>
      <Section title="X509 Certificates">
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
      </Section>
    </TabPanel>
  );
}
