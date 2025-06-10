// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Status } from "@/components/badges";
import { Client } from "@/models/client";
import { dateToHuman } from "@/utils/dates";
import { ComputerDesktopIcon } from "@heroicons/react/24/solid";

export function Metadata(props: Readonly<{ client: Client }>) {
  const { client } = props;
  const createdAt = client.created_at
    ? dateToHuman(new Date(client.created_at))
    : "N/A";
  const statusChangedOn = client.status_changed_on
    ? dateToHuman(new Date(client.status_changed_on))
    : "N/A";
  return (
    <div className="col-span-full space-y-2 text-sm font-light sm:col-span-1">
      <div>
        <div className="text-light dark:text-extralight/60 flex gap-2">
          <ComputerDesktopIcon className="my-auto size-5" />
          <span>Status</span>
          <Status active={client.active ?? false} />
        </div>
      </div>
      <div className="text-extralight flex flex-col">
        <span>Created {createdAt}.</span>
        <span>Status changed on {statusChangedOn}.</span>
        {client.dynamically_registered && <span>Dynamically registered.</span>}
      </div>
    </div>
  );
} 
