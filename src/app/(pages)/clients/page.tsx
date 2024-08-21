import { Suspense } from "react";
import { Page, Panel } from "@/components/Layout";
import ClientsTable from "@/components/ClientsTable";

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
      <Panel>
        <Suspense fallback={"Loading..."}>
          <ClientsTable {...searchParams} isAdmin={true} />
        </Suspense>
      </Panel>
    </Page>
  );
}
