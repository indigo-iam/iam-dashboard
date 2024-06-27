import Link from "next/link";
import Button from "@/components/Button";
import { PlusIcon } from "@heroicons/react/16/solid";
import ClientsTable from "@/app/(pages)/clients/components/ClientsTable";
import Page from "@/components/Page";

type MeClientsProps = {
  searchParams?: {
    count?: string;
    page?: string;
  };
};

export default async function MeClients(props: Readonly<MeClientsProps>) {
  const { searchParams } = props;
  return (
    <Page title="My Clients">
      <div className="flex flex-row gap-2">
        <Link href="/clients/new">
          <Button color="primary" icon={<PlusIcon />}>
            New client
          </Button>
        </Link>
        <Button color="secondary">Redeem client</Button>
      </div>
      <ClientsTable {...searchParams} me={true} />
    </Page>
  );
}
