// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { fetchAttributes } from "@/services/users";
import AddAttributeButton from "./add-button";
import { AttributeView } from "./attribute-view";

type AttributesContentProps = {
  userId: string;
};

async function AttributesContent(props: Readonly<AttributesContentProps>) {
  const { userId } = props;
  const attributes = await fetchAttributes(userId);
  if (attributes.length === 0) {
    return <p>No attribute found.</p>;
  }
  return (
    <div className="flex w-full gap-2">
      {attributes.map(attr => (
        <AttributeView
          key={`${attr.name}-${attr.value}`}
          userId={userId}
          attr={attr}
        />
      ))}
    </div>
  );
}

type AttributesPanelProps = {
  userId: string;
  userName: string;
  isAdmin: boolean;
};

export function AttributesPanel(props: Readonly<AttributesPanelProps>) {
  const { userId, userName, isAdmin } = props;
  return (
    <div className="panel space-y-2">
      <div className="flex justify-between">
        <h2>Attributes</h2>
        {isAdmin && <AddAttributeButton userId={userId} userName={userName} />}
      </div>
      <AttributesContent userId={userId} />
    </div>
  );
}
