// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { AttributesPanel } from "./attributes";
import { LabelsPanel } from "./labels";

type AttributesProps = {
  userId: string;
  userFormattedName: string;
  isAdmin: boolean;
  isMe: boolean;
};

export function AttributesAndLabels(props: Readonly<AttributesProps>) {
  const { userId, userFormattedName, isAdmin, isMe } = props;
  return (
    <TabPanel variant="plain" className="space-y-4">
      <AttributesPanel userId={userId} isAdmin={isAdmin} isMe={isMe} />
      <LabelsPanel
        userId={userId}
        userFormattedName={userFormattedName}
        isAdmin={isAdmin}
        isMe={isMe}
      />
    </TabPanel>
  );
}
