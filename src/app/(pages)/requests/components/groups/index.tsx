// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { Section } from "@/components/layout";
import { GroupRequest } from "@/models/group-requests";
import { dateToHuman } from "@/utils/dates";
import GroupRequestOptions from "./options";
import Link from "next/link";

type RowPros = {
  request: GroupRequest;
};

export function Row(props: Readonly<RowPros>) {
  const { request } = props;
  const { userFullName, username, userUuid, groupName, groupUuid } = request;
  const creationTime = request.creationTime
    ? dateToHuman(new Date(request.creationTime))
    : "N/A";

  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow flex-col">
        <div className="flex gap-1">
          User
          <Link
            href={`/users/${userUuid}`}
            className="inline-flex gap-1 hover:underline"
          >
            <span className="font-bold">{userFullName}</span>
            <span>({username})</span>
          </Link>
          asked to join group
          <Link
            href={`/groups/${groupUuid}`}
            className="inline-flex gap-1 hover:underline"
          >
            <span className="font-bold">{groupName}</span>
          </Link>
          {creationTime}.
        </div>
        <span className="p-2 italic">Motivation: {request.notes}</span>
      </div>
      <GroupRequestOptions request={request} />
    </li>
  );
}

type GroupsProps = {
  requests: GroupRequest[];
};

export default function Groups(props: Readonly<GroupsProps>) {
  const { requests } = props;
  if (requests.length === 0) {
    return (
      <TabPanel className="flex flex-col gap-4 divide-y">
        There are no pending requests.
      </TabPanel>
    );
  }
  return (
    <TabPanel>
      <Section>
        <ul className="w-full table-auto">
          {requests.map(r => (
            <Row key={r.uuid} request={r} />
          ))}
        </ul>
      </Section>
    </TabPanel>
  );
}
