import { Button } from "@/components/Buttons";
import { Suspense } from "react";
import SearchableTable from "./SearchableTable";
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
    <>
      <div className="flex flex-row gap-2">
        <Link href="/clients/new">
          <Button action="primary-outline" icon={<PlusIcon />}>
            New client
          </Button>
        </Link>
        <Button action="primary-outline">Redeem client</Button>
      </div>
      <Suspense fallback="Loading...">
        <SearchableTable {...searchParams} me={me} />
      </Suspense>
    </>
  );
}
