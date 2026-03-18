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
      <div className="flex grow flex-col lg:flex-row">
        <Link
          className="flex grow flex-col gap-0.5 break-all"
          href={`/clients/${site.clientId}`}
        >
          <p className="text-gray-950 dark:text-white">{client_name}</p>
          <div className="flex flex-col gap-0.5 text-sm">
            <p>{site.clientId}</p>
            <p title={scopes} className="line-clamp-1 max-w-md font-light">
              {scopes}
            </p>
          </div>
        </Link>
        <div className="flex flex-col px-2 lg:justify-center">
          <p className="text-xs font-light whitespace-nowrap lg:text-right">
            Last access {accessDate}
          </p>
          <p className="text-xs font-light whitespace-nowrap lg:text-right">
            Authorized {creationDate}
          </p>
        </div>
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
