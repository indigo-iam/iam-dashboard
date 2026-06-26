// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Link from "@/components/link";
import { LoadingList } from "@/components/loading";
import { TabPanel } from "@/components/tabs";
import { Site } from "@/models/sites";
import { getApprovedSites } from "@/services/sites";
import { ApprovedSiteOptions } from "./options";
import { Suspense } from "react";

type ApprovedSiteProps = {
  site: Site;
};

function ApprovedSite(props: Readonly<ApprovedSiteProps>) {
  const { site } = props;
  const { clientName, clientId, clientDescription } = site;
  const scopes = site.allowedScopes.join(" ");
  const accessDate = new Date(site.accessDate).toLocaleDateString();
  const authorizationDate = new Date(
    site.authorizationDate
  ).toLocaleDateString();
  return (
    <li className="iam-list-item">
      <div className="flex w-0 grow flex-col">
        <Link
          className="flex grow flex-col gap-0.5 lg:flex-row"
          href={`/clients/${clientId}`}
        >
          <div className="flex grow flex-col gap-0.5 lg:w-0">
            <div className="text-gray-950 dark:text-white">
              <p>{clientName}</p>
              {clientDescription && (
                <p className="truncate text-sm font-light italic">
                  {clientDescription}
                </p>
              )}
            </div>
            <p className="truncate text-sm">{clientId}</p>
            <p className="truncate text-sm font-light italic" title={scopes}>
              {scopes}
            </p>
          </div>
          <div className="flex gap-2 py-1 lg:flex-col lg:justify-center lg:gap-0 lg:px-2">
            <p className="text-xs font-light whitespace-nowrap lg:text-right">
              Last access {accessDate}
            </p>
            <p className="text-xs font-light whitespace-nowrap lg:text-right">
              Authorized {authorizationDate}
            </p>
          </div>
        </Link>
      </div>
      <ApprovedSiteOptions site={site} />
    </li>
  );
}

async function Content() {
  const approvedSites = await getApprovedSites();
  if (approvedSites.length === 0) {
    return null;
  }
  return (
    <ul>
      {approvedSites.map(site => (
        <ApprovedSite site={site} key={site.id} />
      ))}
    </ul>
  );
}

export async function ApprovedSites() {
  return (
    <TabPanel className="panel">
      <h2 className="py-2">Linked Apps and Websites</h2>
      <Suspense fallback={<LoadingList />}>
        <Content />
      </Suspense>
    </TabPanel>
  );
}
