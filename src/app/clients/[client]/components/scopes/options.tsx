// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import Options from "@/components/options";
import { Client } from "@/models/client";

type ScopeOptionsProps = {
  client: Client;
  scope: string;
};

export function ScopeOptions(props: Readonly<ScopeOptionsProps>) {
  const { client, scope } = props;
  const action = async () => {
    "use server";
    console.log(`delete scope ${scope} from client ${client.client_id}`);
  };
  return (
    <Options>
      <Form action={action}>
        <Button className="popover-option-danger" type="submit">
          Delete
        </Button>
      </Form>
    </Options>
  );
}
