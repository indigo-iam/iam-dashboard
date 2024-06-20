import Link from "next/link";
import Button from "@/components/Button";
import { PlusIcon } from "@heroicons/react/16/solid";
import ClientsTable from "@/app/(pages)/clients/components/ClientsTable";
import { getClientsPage } from "@/services/me";
import Paginator from "@/components/Paginator";

async function AsyncTable(props: { count?: string; page?: string }) {
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

type MeClientsProps = {
  searchParams?: {
    count?: string;
    page?: string;
  };
};

export default async function MeClients(props: Readonly<MeClientsProps>) {
  const { searchParams } = props;
  return (
    <div className="flex flex-col gap-2">
      <h1>My Clients</h1>
      <div className="flex flex-row gap-2">
        <Link href="/clients/new">
          <Button color="primary" icon={<PlusIcon />}>
            New client
          </Button>
        </Link>
        <Button color="secondary">Redeem client</Button>
      </div>
      <AsyncTable {...searchParams} />
    </div>
  );
}
