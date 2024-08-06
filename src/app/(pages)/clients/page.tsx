import { Suspense } from "react";
import Page from "@/components/Page";
import ClientsTable from "@/components/ClientsTable";
import Panel from "@/components/Panel";

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
