// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { SwatchIcon } from "@heroicons/react/24/outline";

import { Panel } from "@/components/layout";
import { UnorderedList } from "@/components/list";
import { fetchUserLabels } from "@/services/users";

import { AddLabelButton } from "./add-button";
import { LabelView } from "./label-view";

type Label = {
  prefix: string;
  name: string;
  value: string | null;
};

type LabelsPanelProps = {
  isAdmin: boolean;
  isMe: boolean;
  userId: string;
  userFormattedName: string;
};

export async function LabelsPanel(props: Readonly<LabelsPanelProps>) {
  const { isAdmin, isMe, userId, userFormattedName } = props;
  const labels = (await fetchUserLabels(userId)) as Label[];
  if (labels.length === 0) {
    return (
      <Panel>
        <h2>Labels</h2>
        <div className="flex flex-col items-center">
          <SwatchIcon className="size-12" />
          <p className="mb-2 text-sm">
            {`Add a label to ${isMe ? "your" : "the user"} account to identify your account`}
          </p>
          <AddLabelButton userId={userId} />
        </div>
      </Panel>
    );
  }
  return (
    <Panel>
      <div className="flex justify-between">
        <h2>Labels</h2>
        {isAdmin && <AddLabelButton userId={userId} />}
      </div>
      <UnorderedList>
        {labels.map(label => (
          <LabelView
            isAdmin={isAdmin}
            key={`${label.prefix}-${label.name}`}
            userFormattedName={userFormattedName}
            name={label.name}
            prefix={label.prefix}
            value={label.value}
            userId={userId}
          />
        ))}
      </UnorderedList>
    </Panel>
  );
}
