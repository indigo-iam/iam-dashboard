import Options from "@/components/Options";
import { Client } from "@/models/client";
import DeleteClient from "./DeleteClient";

type ClientOptionsProps = {
  client: Client;
};

export default function ClientOptions(props: Readonly<ClientOptionsProps>) {
  const { client } = props;
  return (
    <Options>
      <DeleteClient client={client} />
    </Options>
  );
}
