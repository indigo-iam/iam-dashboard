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
  return (
    <li className="iam-list-item flex flex-row">
      <div className="flex grow">
        <Link
          className="flex grow flex-col gap-0.5 break-all hover:underline"
          href={`/clients/${site.clientId}`}
        >
          {"We don't have the name"}
          <div className="flex flex-col">
            <p className="text-gray dark:text-secondary/70 text-sm">
              {site.clientId}
            </p>
            <p
              title={scopes}
              className="text-gray dark:text-secondary/60 line-clamp-1 text-sm"
            >
              {scopes}
            </p>
          </div>
        </Link>
        <div className="my-auto flex flex-col px-2 lg:items-end lg:justify-center">
          <p className="text-gray dark:text-secondary/50 text-sm whitespace-nowrap sm:text-right">
            Last access {accessDate}
          </p>
          <p className="text-gray dark:text-secondary/50 text-sm whitespace-nowrap sm:text-right">
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
  return (
    <TabPanel className="panel">
      <h2>Approved Sites</h2>
      <ul>
        {approvedSites.map(site => (
          <ApprovedSite site={site} key={site.id} />
        ))}
      </ul>
    </TabPanel>
  );
}
