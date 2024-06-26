import { Suspense } from "react";
import Page from "@/components/Page";
import ClientsTable from "./components/ClientsTable";

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
        <ClientsTable {...searchParams} />
      </Suspense>
    </Page>
  );
}
