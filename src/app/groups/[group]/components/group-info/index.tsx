// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { Group } from "@/models/groups";
import { dateToHuman } from "@/utils/dates";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";
import LabelView from "./label-view";
import { AddLabel } from "./add-label";

type GroupInfoProps = {
  group: Group;
};

export default function GroupInfo(props: Readonly<GroupInfoProps>) {
  const { group } = props;
  const labels = group["urn:indigo-dc:scim:schemas:IndigoGroup"].labels;
  const created = group.meta.created
    ? dateToHuman(new Date(group.meta.created))
    : "N/A";
  const lastModified = group.meta.lastModified
    ? dateToHuman(new Date(group.meta.created))
    : "N/A";
  return (
    <TabPanel className="panel space-y-4">
      <h2>Group Information</h2>
      <div>
        <h3 className="mb-2 text-2xl" title="Group Name">
          {group.displayName}
        </h3>
        <p className="mb-2" title="Description">
          {group["urn:indigo-dc:scim:schemas:IndigoGroup"].description}
        </p>
        <p className="text-gray dark:text-light-gray mb-2">{group.id}</p>
        <p className="text-gray dark:text-light-gray flex items-center gap-2 text-sm">
          <CalendarDaysIcon className="size-4" />
          Created {created}
        </p>
        <p className="text-gray dark:text-light-gray flex items-center gap-2 text-sm">
          <ClockIcon className="size-4" />
          Modified {lastModified}
        </p>
      </div>
      <div className="flex-break flex gap-2">
        <AddLabel group={group} />
        {labels?.map(l => (
          <LabelView key={l.value + l.name} group={group} label={l} />
        ))}
      </div>
    </TabPanel>
  );
}
