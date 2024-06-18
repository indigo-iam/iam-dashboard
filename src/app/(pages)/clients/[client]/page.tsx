import Page from "@/components/Page";

type ClientPageProps = {
  params: { client: string };
};

export default function Client(props: Readonly<ClientPageProps>) {
  const { params } = props;
  const { client } = params;

  return <Page title={client}>ciao</Page>;
}
