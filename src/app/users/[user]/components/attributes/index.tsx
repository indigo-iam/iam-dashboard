// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import AttributesTable from "./table";
import AddAttributeButton from "./add-button";

type AttributesProps = {
  userId: string;
  userName: string;
};

export async function Attributes(props: Readonly<AttributesProps>) {
  const { userId, userName } = props;
  return (
    <TabPanel className="panel space-y-4">
      <h2>Attributes</h2>
      <AttributesTable userId={userId} userName={userName} />
      <AddAttributeButton userId={userId} userName={userName} />
    </TabPanel>
  );
}
