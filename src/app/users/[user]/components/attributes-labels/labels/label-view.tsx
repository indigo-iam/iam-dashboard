// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { LabelOptions } from "./options";

type LabelViewProps = {
  userId: string;
  userFormattedName: string;
  prefix: string;
  name: string;
  value: string | null;
  isAdmin: boolean;
};

export function LabelView(props: Readonly<LabelViewProps>) {
  const { userId, userFormattedName, prefix, name, value, isAdmin } = props;
  return (
    <li className="iam-list-item">
      <div className="flex w-full flex-row">
        <div className="flex grow flex-col">
          <span className="grow text-xs">{prefix}</span>
          <span className="flex grow font-medium text-gray-950 dark:text-gray-400">
            {name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">{value}</span>
          {isAdmin && (
            <LabelOptions
              userId={userId}
              userFormattedName={userFormattedName}
              name={name}
              prefix={prefix}
              value={value}
            />
          )}
        </div>
      </div>
    </li>
  );
}
