// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Form } from "@/components/form";
import { TabPanel } from "@/components/tabs";
import { Client } from "@/models/client";
import { GrantType } from "@/models/openid-configuration";
import { editClient } from "@/services/clients";
import { MainGrantTypes } from "./main-grant-types";
import { OtherGrantTypes } from "./other-grant-types";

import { useState } from "react";

type FormButtonsProps = {
  canSave: boolean;
};

function FormButtons(props: Readonly<FormButtonsProps>) {
  const { canSave } = props;
  return (
    <div className="flex flex-row justify-end">
      <Button className="btn-tertiary" type="reset">
        Cancel
      </Button>
      <Button className="btn-secondary" type="submit" disabled={!canSave}>
        Save changes
      </Button>
    </div>
  );
}

type GrantTypesProps = {
  client: Client;
  isAdmin: boolean;
};

export default function GrantTypes(props: Readonly<GrantTypesProps>) {
  const { client, isAdmin } = props;
  const [isAuthGrantOk, setIsAuthGrantOk] = useState(false);

  async function action(formData: FormData) {
    const grant_types = (formData.getAll("grant_type") as GrantType[]).concat(
      formData.getAll("grant_type[id]") as GrantType[]
    );
    const redirect_uris = formData.getAll("redirect_uris") as string[];
    const requestBody: Client = { ...client, grant_types, redirect_uris };
    return editClient(requestBody, isAdmin);
  }

  return (
    <TabPanel className="panel" unmount={false}>
      <Form action={action} className="space-y-4">
        <div className="space-y-4 divide-y">
          <MainGrantTypes
            client={client}
            onAuthGrantChange={setIsAuthGrantOk}
          />
          <OtherGrantTypes client={client} />
        </div>
        <FormButtons canSave={isAuthGrantOk} />
      </Form>
    </TabPanel>
  );
}
