// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { Registration } from "@/models/registration";
import { Section } from "@/components/layout";
import RegistrationRequestsOptions from "./options";
import Link from "next/link";

type RowProps = {
  request: Registration;
};

function Row(props: Readonly<RowProps>) {
  const { request } = props;
  return (
    <li className="iam-list-item">
      <div className="flex grow flex-col">
        <div className="flex flex-row gap-1">
          User
          <Link
            className="inline-flex gap-1 underline"
            href={`/users/${request.accountId}`}
          >
            <span className="inline-flex font-bold">{`${request.givenname} ${request.familyname}`}</span>
            <span className="inline-flex">({request.username})</span>
          </Link>
          <span>applied for an account.</span>
        </div>
        <span className="flex flex-row p-2 italic">Notes: {request.notes}</span>
      </div>
      <RegistrationRequestsOptions request={request} />
    </li>
  );
}

type RegistrationsProps = {
  requests: Registration[];
};

export default function Registrations(props: Readonly<RegistrationsProps>) {
  const { requests } = props;

  if (requests.length === 0) {
    return (
      <TabPanel>
        <Section>There are no pending requests.</Section>
      </TabPanel>
    );
  }

  return (
    <TabPanel>
      <Section>
        <ul>
          {requests.map(r => (
            <Row key={r.uuid} request={r} />
          ))}
        </ul>
      </Section>
    </TabPanel>
  );
}
