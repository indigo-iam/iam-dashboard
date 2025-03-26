// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Options from "@/components/options";
import { Client } from "@/models/client";
import DeleteClient from "./delete-client";

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
