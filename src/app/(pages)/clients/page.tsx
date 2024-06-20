import { Suspense } from "react";
import Page from "@/components/Page";
import ClientsTable from "./components/ClientsTable";
import { getClientsPage } from "@/services/clients";
import Paginator from "@/components/Paginator";

async function AsyncTable(props: Readonly<{ count?: string; page?: string }>) {
  const itemsPerPage = props.count ? parseInt(props.count) : 10;
  const currentPage = props.page ? parseInt(props.page) + 1 : 1;
  const response = await getClientsPage(itemsPerPage, currentPage);
  const { totalResults } = response;
  return (
    <ClientsTable clients={response.Resources}>
      <Paginator numberOfPages={totalResults} />
    </ClientsTable>
  );
}

type ClientsProps = {
  searchParams?: {
    count?: string;
    page?: string;
  };
};

export default function Clients(props: Readonly<ClientsProps>) {
  const { searchParams } = props;
  return (
    <Page title="Clients">
      <Suspense fallback={"Loading..."}>
        <AsyncTable {...searchParams} />
      </Suspense>
    </Page>
  );
}
