// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

type NoticeProps = {
  children?: React.ReactNode;
};

export function Note(props: Readonly<NoticeProps>) {
  const { children } = props;
  return (
    <div className="space-y-2 rounded border-l-4 border-l-sky-500 bg-sky-50 px-4 py-2">
      <h5 className="flex items-center gap-1 text-sm font-bold text-sky-900">
        <InformationCircleIcon className="size-4" />
        Note
      </h5>
      <div className="text-sm text-sky-900">{children}</div>
    </div>
  );
}

export function Warning(props: Readonly<NoticeProps>) {
  const { children } = props;
  return (
    <div className="rounded border-l-4 border-l-orange-500 bg-orange-50 px-4 py-2">
      <h5 className="flex items-center gap-1 font-bold text-orange-900">
        <ExclamationTriangleIcon className="size-4" />
        Warning
      </h5>
      <div className="text-sm text-orange-900">{children}</div>
    </div>
  );
}
