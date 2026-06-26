// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import AttributesTable from "./table";
import AddAttributeButton from "./add-button";

type AttributesProps = {
  userId: string;
  userName: string;
  userFormattedName: string;
  isAdmin: boolean;
};

export async function Attributes(props: Readonly<AttributesProps>) {
  const { userId, userName, userFormattedName, isAdmin } = props;
  return (
    <TabPanel className="panel space-y-4">
      <div className="flex justify-between">
        <h2>Attributes</h2>
        {isAdmin && <AddAttributeButton userId={userId} userName={userName} />}
      </div>
      <AttributesTable
        userId={userId}
        userFormattedName={userFormattedName}
        isAdmin={isAdmin}
      />
    </TabPanel>
  );
}
