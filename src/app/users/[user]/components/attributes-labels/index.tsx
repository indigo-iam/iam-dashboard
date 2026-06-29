// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { AttributesPanel } from "./attributes";
import { LabelsPanel } from "./labels";

type AttributesProps = {
  userId: string;
  userName: string;
  isAdmin: boolean;
};

export async function AttributesAndLabels(props: Readonly<AttributesProps>) {
  const { userId, userName, isAdmin } = props;
  return (
    <TabPanel className="space-y-4">
      <AttributesPanel userId={userId} userName={userName} isAdmin={isAdmin} />
      <LabelsPanel isAdmin={isAdmin} userId={userId} />
    </TabPanel>
  );
}
