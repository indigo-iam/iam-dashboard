// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Group } from "@/models/groups";
import { dateToHuman } from "@/utils/dates";

type GroupInfoProps = {
  group: Group;
};

export default function GroupInfo(props: Readonly<GroupInfoProps>) {
  const { group } = props;
  const description =
    group["urn:indigo-dc:scim:schemas:IndigoGroup"].description;
  const created = group.meta.created
    ? dateToHuman(new Date(group.meta.created))
    : "N/A";
  return (
    <div className="panel space-y-4">
      <h2 className="border-b">Group Information</h2>
      <ul className="flex flex-col">
        <li className="inline-flex gap-1">
          <span className="font-bold">Name:</span>
          <span>{group.displayName}</span>
        </li>
        <li className="inline-flex gap-1">
          <span className="font-bold">Description:</span>
          <span>{description}</span>
        </li>
        <li className="inline-flex gap-1">
          <span className="font-bold">Created:</span>
          <span>{created}</span>
        </li>
      </ul>
    </div>
  );
}
