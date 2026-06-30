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
  userId: string;
};

async function LabelsContent(props: Readonly<LabelsContentProps>) {
  const { userId } = props;
  const labels = (await fetchUserLabels(userId)) as Label[];

  if (labels.length === 0) {
    return <p>No label found.</p>;
  }

  return (
    <div className="flex w-full gap-2">
      {labels.map(label => (
        <LabelView
          key={`${label.prefix}-${label.name}`}
          name={label.name}
          prefix={label.prefix}
          value={label.value}
          userId={userId}
        />
      ))}
    </div>
  );
}

type LabelsPanelProps = {
  isAdmin: boolean;
  userId: string;
};

export function LabelsPanel(props: Readonly<LabelsPanelProps>) {
  const { isAdmin, userId } = props;
  return (
    <div className="panel space-y-2">
      <div className="flex justify-between">
        <h2>Labels</h2>
        {isAdmin && <AddLabelButton userId={userId} />}
      </div>
      {<LabelsContent userId={userId} />}
    </div>
  );
}
