// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { AttributesCard } from "./attributes";
import { LabelsPanel } from "./labels";

type AttributesProps = {
  userId: string;
  userName: string;
  userFormattedName: string;
  isAdmin: boolean;
};

export async function AttributesAndLabels(props: Readonly<AttributesProps>) {
  const { userId, userName, userFormattedName, isAdmin } = props;
  return (
    <TabPanel className="space-y-4">
      <AttributesCard
        userId={userId}
        userName={userName}
        userFormattedName={userFormattedName}
        isAdmin={isAdmin}
      />
      <LabelsPanel isAdmin={isAdmin} userId={userId} />
    </TabPanel>
  );
}
