// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { XCircleIcon } from "@heroicons/react/16/solid";

type LabelProps = {
  name?: string;
  value?: string;
  onClick?: () => void;
};

export default function LabelView(props: Readonly<LabelProps>) {
  const { name, value, onClick } = props;
  return (
    <button
      className="flex cursor-pointer items-center gap-1 rounded-full bg-sky-500 px-2 py-0.5 text-sm text-white dark:bg-sky-800/30 dark:text-sky-400/80"
      onClick={onClick}
    >
      <span className="flex items-center gap-1">
        <b>{name}</b> {value}
      </span>
      <XCircleIcon className="size-4 hover:text-gray-300" />
    </button>
  );
}
