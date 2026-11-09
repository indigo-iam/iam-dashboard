// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Panel } from "@/components/layout";
import { ListItem, UnorderedList } from "@/components/list";
import { Certificate } from "@/models/indigo-user";
import { dateToHuman, getNow } from "@/utils/dates";

import LinkCertificateButton from "./link-certificate-button";
import { LinkProxyButton } from "./link-proxy-button/";
import CertificateOptions from "./options";

type CertificateViewProps = {
  isAdmin: boolean;
  userId: string;
  userFormattedName: string;
  cert: Certificate;
};

function CertificateView(props: Readonly<CertificateViewProps>) {
  const { isAdmin, userId, userFormattedName, cert } = props;
  const [proxyExpired, proxyExpirationTime] = (() => {
    if (!cert.proxyExpirationTime) {
      return [false, undefined];
    }
    const expirationTime = new Date(cert.proxyExpirationTime);
    const expired = expirationTime.getTime() < getNow();
    return [expired, dateToHuman(new Date(cert.proxyExpirationTime))];
  })();
  return (
    <ListItem>
      <div className="grow space-y-2">
        <p className="text-gray-950 dark:text-gray-200">{cert.display}</p>
        <div className="flex flex-col gap-0.5">
          <p className="text-xs">Subject {cert.subjectDn}</p>
          <p className="text-xs">Issuer {cert.issuerDn}</p>
          {cert.hasProxyCertificate && (
            <p className="text-xs font-semibold">
              Has proxy certificate.
              {proxyExpirationTime && (
                <>{` Proxy ${proxyExpired ? "expired" : "expires"} ${proxyExpirationTime}.`}</>
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
    </ListItem>
  );
}

type CertificateListProps = {
  isAdmin: boolean;
  userId: string;
  userFormattedName: string;
  certificates: Certificate[];
};

function CertificateList(props: Readonly<CertificateListProps>) {
  const { isAdmin, userId, userFormattedName, certificates } = props;
  if (certificates.length === 0) {
    return <p>There are not linked certificates.</p>;
  }
  return (
    <UnorderedList>
      {certificates.map(cert => (
        <CertificateView
          isAdmin={isAdmin}
          key={cert.subjectDn + cert.issuerDn}
          userId={userId}
          userFormattedName={userFormattedName}
          cert={cert}
        />
      ))}
    </UnorderedList>
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

export function Certificates(props: Readonly<CertificateProps>) {
  const { isMe, userId, userName, userFormattedName, certificates, isAdmin } =
    props;
  return (
    <Panel>
      <div className="flex flex-wrap justify-between">
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
      <CertificateList
        isAdmin={isAdmin}
        userId={userId}
        userFormattedName={userFormattedName}
        certificates={certificates}
      />
    </Panel>
  );
}
