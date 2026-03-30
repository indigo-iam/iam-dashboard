// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Client } from "@/models/client";
import { TabPanel } from "@/components/tabs";
import { GeneralForm } from "./general-form";
import { DangerZone } from "./danger-zone";

type MainProps = {
  client: Client;
  isAdmin: boolean;
};

export default function Main(props: Readonly<MainProps>) {
  const { client, isAdmin } = props;
  return (
    <TabPanel className="panel divide-y" unmount={false}>
      <GeneralForm client={client} isAdmin={isAdmin} />
      <DangerZone client={client} isAdmin={isAdmin} />
    </TabPanel>
  );
}
