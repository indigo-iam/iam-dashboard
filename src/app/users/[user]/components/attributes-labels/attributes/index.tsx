// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import AttributesTable from "./table";
import AddAttributeButton from "./add-button";

type AttributesCardProps = {
  userId: string;
  userName: string;
  userFormattedName: string;
  isAdmin: boolean;
};

export function AttributesCard(props: Readonly<AttributesCardProps>) {
  const { userId, userName, userFormattedName, isAdmin } = props;
  return (
    <div className="panel">
      <div className="flex justify-between">
        <h2>Attributes</h2>
        {isAdmin && <AddAttributeButton userId={userId} userName={userName} />}
      </div>
      <AttributesTable
        userId={userId}
        userFormattedName={userFormattedName}
        isAdmin={isAdmin}
      />
    </div>
  );
}
