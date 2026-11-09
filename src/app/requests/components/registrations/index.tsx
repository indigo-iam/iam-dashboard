// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Registration } from "@/models/registration";
import { dateToHuman } from "@/utils/dates";
import { Panel } from "@/components/layout";
import Link from "@/components/link";
import { ListItem, UnorderedList } from "@/components/list";

import RegistrationRequestsOptions from "./options";

type RowProps = {
  request: Registration;
};

function Row(props: Readonly<RowProps>) {
  const { request } = props;
  const creationTime = request.creationTime
    ? dateToHuman(new Date(request.creationTime))
    : "N/A";
  return (
    <ListItem>
      <div className="flex grow">
        <div>
          <p className="text-gray-950 dark:text-gray-100">
            User{" "}
            <Link className="iam-link" href={`/users/${request.accountId}`}>
              {`${request.givenname} ${request.familyname}`} (
              <i>{request.username}</i>)
            </Link>{" "}
            applied for an account.
          </p>
          <p className="text-sm">
            Motivation: <q>{request.notes}</q>
          </p>
          <p className="text-xs">Sent {creationTime}</p>
        </div>
      </div>
      <RegistrationRequestsOptions request={request} />
    </ListItem>
  );
}

type RegistrationsProps = {
  requests: Registration[];
};

export default function Registrations(props: Readonly<RegistrationsProps>) {
  const { requests } = props;
  if (requests.length === 0) {
    return (
      <Panel>
        <h3>Registration requests</h3>
        <p className="text-gray p-2 dark:text-white/60">
          There are no pending requests.
        </p>
      </Panel>
    );
  }

  return (
    <Panel>
      <h3>Registration requests</h3>
      <UnorderedList>
        {requests.map(r => (
          <Row key={r.uuid} request={r} />
        ))}
      </UnorderedList>
    </Panel>
  );
}
