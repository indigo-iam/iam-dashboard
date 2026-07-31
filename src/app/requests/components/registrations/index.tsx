// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Registration } from "@/models/registration";
import { dateToHuman } from "@/utils/dates";
import RegistrationRequestsOptions from "./options";
import Link from "@/components/link";

type RowProps = {
  request: Registration;
};

function Row(props: Readonly<RowProps>) {
  const { request } = props;
  const creationTime = request.creationTime
    ? dateToHuman(new Date(request.creationTime))
    : "N/A";
  return (
    <li className="iam-list-item">
      <div className="flex grow flex-col space-y-2 lg:flex-row">
        <div className="grow space-y-2">
          <p className="text-gray-950 dark:text-gray-100">
            User{" "}
            <Link className="iam-link" href={`/users/${request.accountId}`}>
              {`${request.givenname} ${request.familyname}`} (
              <i>{request.username}</i>)
            </Link>{" "}
            applied for an account.
          </p>
          <p className="text-sm">Motivation: {request.notes}</p>
        </div>
        <p className="flex items-center text-xs whitespace-nowrap lg:px-2 lg:text-right">
          Sent {creationTime}
        </p>
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
      <div className="panel">
        <h3>Registration requests</h3>
        <p className="text-gray p-2 dark:text-white/60">
          There are no pending requests.
        </p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h3>Registration requests</h3>
      <ul>
        {requests.map(r => (
          <Row key={r.uuid} request={r} />
        ))}
      </ul>
    </div>
  );
}
