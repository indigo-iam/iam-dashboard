// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { SquaresPlusIcon } from "@heroicons/react/24/outline";

import { Panel } from "@/components/layout";
import { fetchAttributes } from "@/services/users";
import AddAttributeButton from "./add-button";
import { AttributeView } from "./attribute-view";

type AttributesPanelProps = {
  userId: string;
  isAdmin: boolean;
  isMe: boolean;
};

export async function AttributesPanel(props: Readonly<AttributesPanelProps>) {
  const { userId, isAdmin, isMe } = props;
  const attributes = await fetchAttributes(userId);
  if (attributes.length === 0) {
    return (
      <Panel>
        <h2>Attributes</h2>
        <div className="flex flex-col items-center">
          <SquaresPlusIcon className="size-12 text-gray-400" />
          <p className="p-2 text-sm">
            {`Add an attribute to ${isMe ? "your" : "the user"} account to describe your profile characteristics.`}
          </p>
          <AddAttributeButton userId={userId} isMe={isMe} />
        </div>
      </Panel>
    );
  }
  return (
    <Panel>
      <div className="flex justify-between">
        <h2>Attributes</h2>
        {isAdmin && (
          <AddAttributeButton userId={userId} variant="outline" isMe={isMe} />
        )}
      </div>
      {attributes.map(attr => (
        <AttributeView
          isAdmin={isAdmin}
          key={`${attr.name}-${attr.value}`}
          userId={userId}
          attr={attr}
        />
      ))}
    </Panel>
  );
}
