// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import TabPanel from "@/components/tabs/tab-panel";
import { Site } from "@/models/sites";
import { getApprovedSites } from "@/services/sites";
import Link from "next/link";
import { ApprovedSiteOptions } from "./options";

type ApprovedSiteProps = {
  site: Site;
};

function ApprovedSite(props: Readonly<ApprovedSiteProps>) {
  const { site } = props;
  const scopes = site.allowedScopes.join(" ");
  const accessDate = new Date(site.accessDate).toLocaleDateString();
  const creationDate = new Date(site.creationDate).toLocaleDateString();
  const client_name = "We don't have the name";
  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex w-0 grow flex-col">
        <Link
          className="flex grow flex-col gap-0.5 lg:flex-row"
          href={`/clients/${site.clientId}`}
        >
          <div className="flex grow flex-col gap-0.5 lg:w-0">
            <p className="text-gray-950 dark:text-white">{client_name}</p>
            <p className="truncate text-sm">{site.clientId}</p>
            <p className="truncate text-sm font-light italic" title={scopes}>
              {scopes}
            </p>
          </div>
          <div className="flex gap-2 py-1 lg:flex-col lg:justify-center lg:gap-0 lg:px-2">
            <p className="text-xs font-light whitespace-nowrap lg:text-right">
              Last access {accessDate}
            </p>
            <p className="text-xs font-light whitespace-nowrap lg:text-right">
              Authorized {creationDate}
            </p>
          </div>
        </Link>
      </div>
      <ApprovedSiteOptions site={site} />
    </li>
  );
}

export async function ApprovedSites() {
  const approvedSites = await getApprovedSites();
  if (approvedSites.length === 0) {
    return (
      <TabPanel className="panel" unmount={false}>
        <h2 className="py-2">Approved Sites</h2>
        <p>No approved sites found.</p>
      </TabPanel>
    );
  }
  return (
    <TabPanel className="panel" unmount={false}>
      <h2 className="py-2">Approved Sites</h2>
      <ul>
        {approvedSites.map(site => (
          <ApprovedSite site={site} key={site.id} />
        ))}
      </ul>
    </TabPanel>
  );
}
