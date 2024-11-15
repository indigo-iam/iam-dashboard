import { Page, Panel, Section } from "@/components/Layout";
import InputQuery from "@/components/Inputs/InputQuery";
import ClientsTable from "@/components/Clients";
import { getClientsPage } from "@/services/clients";
import Paginator from "@/components/Paginator";
import { Button } from "@/components/Buttons";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Suspense } from "react";

type ClientsProps = {
  searchParams?: {
    count?: string;
    page?: string;
    query?: string;
  };
  me?: boolean;
};

export default async function ClientsPage(props: Readonly<ClientsProps>) {
  const { searchParams, me } = props;
  const count = searchParams?.count ? parseInt(searchParams.count) : 10;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const query = searchParams?.query;
  const startIndex = 1 + count * (page - 1);
  const clientPage = await getClientsPage(count, startIndex, me, query);
  const numberOfPages = Math.ceil(clientPage.totalResults / count);
  const clients = clientPage.Resources;
  return (
    <Page title="Clients">
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
