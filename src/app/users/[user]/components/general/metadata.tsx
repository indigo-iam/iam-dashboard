// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Status } from "@/components/badges";
import { User } from "@/models/scim";
import { dateToHuman } from "@/utils/dates";
import { IdentificationIcon } from "@heroicons/react/24/outline";

export function Metadata(props: Readonly<{ user: User }>) {
  const { user } = props;
  const created = user.meta?.created
    ? dateToHuman(new Date(user.meta.created))
    : "N/A";
  const modified = user.meta?.lastModified
    ? dateToHuman(new Date(user.meta.lastModified))
    : "N/A";
  return (
    <div className="col-span-full space-y-2 text-sm font-light sm:col-span-2">
      <div>
        <div className="text-light dark:text-extralight/60 flex justify-between">
          <div className="flex gap-2">
            <IdentificationIcon className="my-auto size-5" />
            UUID
          </div>
          <Status active={user.active ?? false} />
        </div>
        <div className="text-extralight">{user.id}</div>
      </div>
      <div className="text-extralight">
        <div>Created {created}.</div>
        <div>Last modified {modified}.</div>
      </div>
    </div>
  );
}
