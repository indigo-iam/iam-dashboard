// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { fetchUserLabels } from "@/services/users";
import { AddLabelButton } from "./add-button";
import { LabelView } from "./label-view";

type Label = {
  prefix: string;
  name: string;
  value: string | null;
};

type LabelsContentProps = {
  userFormattedName: string;
  isAdmin: boolean;
  userId: string;
};

async function LabelsContent(props: Readonly<LabelsContentProps>) {
  const { userFormattedName, isAdmin, userId } = props;
  const labels = (await fetchUserLabels(userId)) as Label[];

  if (labels.length === 0) {
    return <p>No label found.</p>;
  }

  return (
    <ul>
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
    </ul>
  );
}

type LabelsPanelProps = {
  isAdmin: boolean;
  userId: string;
  userFormattedName: string;
};

export function LabelsPanel(props: Readonly<LabelsPanelProps>) {
  const { isAdmin, userId, userFormattedName } = props;
  return (
    <div className="panel space-y-2">
      <div className="flex justify-between">
        <h2>Labels</h2>
        {isAdmin && <AddLabelButton userId={userId} />}
      </div>
      {
        <LabelsContent
          userFormattedName={userFormattedName}
          isAdmin={isAdmin}
          userId={userId}
        />
      }
    </div>
  );
}
