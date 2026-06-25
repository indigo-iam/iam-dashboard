// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { redirect } from "next/navigation";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

import { getSession, isUserAdmin } from "@/auth";
import { TabGroup, TabList, TabPanels, Tab, TabPanel } from "@/components/tabs";
import { LoadingList } from "@/components/loading";
import { LoadingForm } from "@/components/loading/loading-form";

export default async function Client() {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const isAdmin = await isUserAdmin();
  return (
    <section>
      <header className="section-header">
        <RocketLaunchIcon className="size-5" />
        <h2 className="text-base font-normal">Loading...</h2>
      </header>
      <TabGroup className="container space-y-8">
        <TabList className="flex overflow-auto">
          <Tab>GENERAL</Tab>
          <Tab>CREDENTIALS</Tab>
          <Tab>SCOPES</Tab>
          <Tab>GRANT TYPES</Tab>
          <Tab>TOKENS</Tab>
          {isAdmin && <Tab>OWNERS</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoadingForm />
          </TabPanel>
          <TabPanel>
            <LoadingList />
          </TabPanel>
          <TabPanel>
            <LoadingList />
          </TabPanel>
          <TabPanel>
            <LoadingList />
          </TabPanel>
          <TabPanel>
            <LoadingList />
          </TabPanel>
          {isAdmin && (
            <TabPanel>
              <LoadingList />
            </TabPanel>
          )}
        </TabPanels>
      </TabGroup>
    </section>
  );
}
