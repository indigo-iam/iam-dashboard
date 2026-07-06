// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Certificate } from "@/models/indigo-user";
import LinkCertificateButton from "./link-certificate-button";
import { LinkProxyButton } from "./link-proxy-button/";
import CertificateOptions from "./options";
import { dateToHuman } from "@/utils/dates";

type CertificateViewProps = {
  isAdmin: boolean;
  userId: string;
  userFormattedName: string;
  cert: Certificate;
};

function CertificateView(props: Readonly<CertificateViewProps>) {
  const { isAdmin, userId, userFormattedName, cert } = props;
  const proxyExpirationTime = cert.proxyExpirationTime
    ? dateToHuman(new Date(cert.proxyExpirationTime))
    : undefined;
  return (
    <div className="iam-list-item items-center">
      <div className="grow space-y-2">
        <p className="text-gray-950 dark:text-gray-200">{cert.display}</p>
        <div className="flex flex-col gap-0.5">
          <p className="text-xs">Subject {cert.subjectDn}</p>
          <p className="text-xs">Issuer {cert.issuerDn}</p>
          {cert.hasProxyCertificate && (
            <p className="text-xs font-semibold">
              Has proxy certificate.
              {proxyExpirationTime && (
                <> Proxy expires {proxyExpirationTime}.</>
              )}
            </p>
          )}
        </div>
      </div>
      <CertificateOptions
        isAdmin={isAdmin}
        userId={userId}
        userFormattedName={userFormattedName}
        certificate={cert}
      />
    </div>
  );
}

type CertificateProps = {
  isMe: boolean;
  userId: string;
  userName: string;
  userFormattedName: string;
  certificates: Certificate[];
  isAdmin: boolean;
};

export async function Certificates(props: Readonly<CertificateProps>) {
  const { isMe, userId, userName, userFormattedName, certificates, isAdmin } =
    props;
  return (
    <div className="panel space-y-2">
      <div className="flex justify-between">
        <h2>X.509 certificates</h2>
        <div className="flex gap-2">
          {isAdmin && (
            <LinkCertificateButton
              userId={userId}
              userName={userName}
              isAdmin={isAdmin}
            />
          )}
          {isMe && (
            <LinkProxyButton
              userId={userId}
              userName={userName}
              disabled={certificates.length === 0}
            />
          )}
        </div>
      </div>
      {certificates.length === 0 ? (
        <p>There are not linked certificates.</p>
      ) : (
        certificates.map(cert => (
          <CertificateView
            isAdmin={isAdmin}
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
