// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type NoticeProps = {
  children?: React.ReactNode;
};

export function Warning(props: Readonly<NoticeProps>) {
  const { children } = props;
  return (
    <div className="border-l-4 border-l-orange-500 bg-orange-50 px-4 py-2">
      <h5 className="flex items-center gap-2 font-bold text-orange-900">
        <ExclamationTriangleIcon className="mt-0.5 size-5" />
        Warning
      </h5>
      <div className="text-sm text-orange-900">{children}</div>
    </div>
  );
}
