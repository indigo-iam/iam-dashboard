import { Page, Panel, Section } from "@/components/Layout";
import Clients from "@/components/Clients";

type ClientsProps = {
  searchParams?: {
    count?: string;
    page?: string;
  };
};

export default function ClientsPage(props: Readonly<ClientsProps>) {
  const { searchParams } = props;
  return (
    <Page title="Clients">
      <Panel>
        <Section>
          <Clients searchParams={searchParams} />
        </Section>
      </Panel>
    </Page>
  );
}
