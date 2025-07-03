// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { User } from "@/models/scim";
import { TabPanel } from "@/components/tabs";
import AttributesTable from "./table";
import AddAttributeButton from "./add-button";

type AttributesProps = {
  user: User;
};

export function Attributes(props: Readonly<AttributesProps>) {
  const { user } = props;
  return (
    <TabPanel className="panel space-y-4">
      <h2>Attributes</h2>
      <AttributesTable user={user} />
      <AddAttributeButton user={user} />
    </TabPanel>
  );
}
