// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { Registration } from "@/models/registration";
import { dateToHuman } from "@/utils/dates";
import RegistrationRequestsOptions from "./options";
import Link from "next/link";

type RowProps = {
  request: Registration;
};

function Row(props: Readonly<RowProps>) {
  const { request } = props;
  const creationTime = request.creationTime
    ? dateToHuman(new Date(request.creationTime))
    : "N/A";
  return (
    <li className="iam-list-item flex flex-row items-center">
      <div className="flex grow flex-col">
        <p className="flex flex-row gap-1">
          User
          <Link
            className="inline-flex gap-1 underline"
            href={`/users/${request.accountId}`}
          >
            <span className="inline-flex font-bold">{`${request.givenname} ${request.familyname}`}</span>
            <span className="inline-flex">({request.username})</span>
          </Link>
          applied for an account.
        </p>
        {request.notes && (
          <p className="text-gray dark:text-secondary/60 line-clamp-1 text-sm">
            Motivation: {request.notes}
          </p>
        )}
      </div>
      <p className="text-gray dark:text-secondary/50 px-2 text-sm whitespace-nowrap sm:text-right">
        Sent {creationTime}
      </p>{" "}
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
      <TabPanel className="panel">
        <p className="dark:text-secondary/60 text-gray p-2">
          There are no pending registration requests.
        </p>
      </TabPanel>
    );
  }

  return (
    <TabPanel className="panel">
      <ul>
        {requests.map(r => (
          <Row key={r.uuid} request={r} />
        ))}
      </ul>
    </TabPanel>
  );
}
