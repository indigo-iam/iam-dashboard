import { Panel } from "@/components/Layout";
import { Button } from "@/components/Buttons";
import { Suspense } from "react";
import ClientsTable from "./Table";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type ClientsProps = {
  searchParams?: {
    count?: string;
    page?: string;
  };
  me?: boolean;
};

export default function Clients(props: Readonly<ClientsProps>) {
  const { searchParams, me } = props;
  return (
    <Panel>
      <div className="flex flex-row gap-2">
        <Link href="/clients/new">
          <Button color="primary" icon={<PlusIcon />}>
            New client
          </Button>
        </Link>
        <Button color="secondary">Redeem client</Button>
      </div>
      <Suspense fallback="Loading...">
        <ClientsTable {...searchParams} me={me} />
      </Suspense>
    </Panel>
  );
}
