import { Page, Panel, Section } from "@/components/layout";
import { InputQuery } from "@/components/inputs";
import ClientsTable from "@/components/clients";
import { getClientsPage } from "@/services/clients";
import Paginator from "@/components/paginator";
import { Button } from "@/components/buttons";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Suspense } from "react";

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
  const numberOfPages = Math.ceil(clientPage.totalResults / count);
  const clients = clientPage.Resources;
  return (
    <Page title={`${isMe ? "My Clients" : "Clients"}`}>
      <Panel>
        <Section>
          <div className="flex flex-row gap-2">
            <Link href="/clients/new">
              <Button action="primary-outline" icon={<PlusIcon />}>
                New client
              </Button>
            </Link>
            <Button action="primary-outline">Redeem client</Button>
          </div>
          <InputQuery />
          <Suspense fallback="Loading...">
            <ClientsTable clients={clients} />
          </Suspense>
        </Section>
        <Paginator numberOfPages={numberOfPages} />
      </Panel>
    </Page>
  );
}
