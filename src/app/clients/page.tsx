// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ClientsTable } from "@/app/components/clients";
import { Layout } from "@/app/components/layout";
import { InputQuery } from "@/components/inputs";
import { getClientsPage } from "@/services/clients";
import Paginator from "@/components/paginator";
import { Button } from "@/components/buttons";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Suspense } from "react";

function Buttons() {
  return (
    <div className="flex flex-row gap-2">
      <Link href="/clients/new">
        <Button className="btn-secondary">
          <PlusIcon className="my-auto size-5" />
          New client
        </Button>
      </Link>
      <Button className="btn-secondary">Redeem client</Button>
    </div>
  );
}

type ClientsProps = {
  searchParams?: Promise<{
    count?: string;
    page?: string;
    query?: string;
    me?: string;
  }>;
};

export default async function ClientsPage(props: Readonly<ClientsProps>) {
  const searchParams = await props.searchParams;
  const isMe = searchParams?.hasOwnProperty("me");
  const count = searchParams?.count ? parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const query = searchParams?.query;
  const startIndex = 1 + count * (page - 1);
  const clientPage = await getClientsPage(count, startIndex, isMe, query);
  const numberOfPages = Math.ceil(clientPage.totalResults / count) || 1;
  const clients = clientPage.Resources;
  return (
    <Layout title={`${isMe ? "My Clients" : "Clients"}`}>
      <div className="space-y-4">
        <Buttons />
        <InputQuery
          title="Search client"
          placeholder="Type to search a client"
          data-testid="search-client"
          aria-label="Search client"
        />
        <div className="panel space-y-4">
          <Suspense fallback="Loading...">
            <ClientsTable clients={clients} />
          </Suspense>
        </div>
        <Paginator numberOfPages={numberOfPages} />
      </div>
    </Layout>
  );
}
