import Link from "next/link";
import { Button } from "@/components";
import { ClientsTable } from "./components";
import { PlusIcon } from "@heroicons/react/16/solid";
import { fetchClients } from "@/services/me";

export default async function MyClient() {
  const meClients = await fetchClients(1);
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
      <ClientsTable meClients={meClients} />
    </div>
  );
}
