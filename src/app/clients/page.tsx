// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession, isUserAdmin } from "@/auth";
import { ClientsTable } from "@/app/components/clients";
import { InputQuery } from "@/components/inputs";
import { getClientsByAccount, getClientsPage } from "@/services/clients";
import Paginator from "@/components/paginator";
import { Button } from "@/components/buttons";

import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { PlusIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";
import Loading from "./loading";

function Buttons() {
  return (
    <div className="flex flex-row gap-2">
      <Link href="/clients/new" tabIndex={-1}>
        <Button className="btn-secondary">
          <PlusIcon className="size-4" />
          New client
        </Button>
      </Link>
      <Button className="btn-secondary">Redeem</Button>
    </div>
  );
}

type ClientsProps = {
  isAdmin: boolean;
  count: number;
  startIndex: number;
  query?: string;
  accountId: string;
};

export async function ClientsPage(props: Readonly<ClientsProps>) {
  const { isAdmin, count, startIndex, query, accountId } = props;
  const clientPage = isAdmin
    ? await getClientsPage(count, startIndex, query)
    : await getClientsByAccount(accountId, count, startIndex);
  const numberOfPages =
    Math.ceil(clientPage.totalResults / clientPage.itemsPerPage) || 1;
  const clients = clientPage.Resources;
  return (
    <section>
      <header className="section-header flex flex-wrap gap-2">
        <div className="flex grow items-center gap-2">
          <RocketLaunchIcon className="size-5" />
          <h2 className="text-base font-normal">
            {isAdmin ? "Clients" : "My clients"}
          </h2>
          <div
            title="Number of clients in this organization"
            className="middle rounded-full bg-gray-400 px-2 py-0.5 text-xs font-semibold text-white"
          >
            {clientPage.totalResults}
          </div>
        </div>
        <InputQuery
          title="Search client"
          placeholder="Type to search a client"
          data-testid="search-client"
          aria-label="Search client"
        />
        <Buttons />
      </header>
      <div className="container space-y-4">
        <div className="panel">
          <ClientsTable clients={clients} isAdmin={isAdmin} />
        </div>
        <Paginator numberOfPages={numberOfPages} />
      </div>
    </section>
  );
}

type PageProps = {
  searchParams?: Promise<{
    count?: string;
    page?: string;
    query?: string;
  }>;
};

export default async function Page(props: Readonly<PageProps>) {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }
  const isAdmin = await isUserAdmin();
  const searchParams = await props.searchParams;
  const count = searchParams?.count ? parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const query = searchParams?.query;
  const startIndex = 1 + count * (page - 1);
  return (
    <Suspense fallback={<Loading />}>
      <ClientsPage
        isAdmin={isAdmin}
        count={count}
        startIndex={startIndex}
        query={query}
        accountId={session.user?.sub}
      />
    </Suspense>
  );
}
