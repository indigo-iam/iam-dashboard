// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

function PlaceholderRow() {
  return (
    <li className="lex flex-row items-center rounded-l-sm border-b border-l-4 border-l-transparent px-2 py-6 text-gray-500 last:border-transparent dark:text-gray-400">
      <div className="w-full animate-pulse space-y-4">
        <div className="h-2.5 w-4/5 rounded bg-gray-200 dark:bg-gray-500" />
        <div className="h-2.5 w-1/3 rounded bg-gray-200 dark:bg-gray-500" />
      </div>
    </li>
  );
}

export function LoadingList() {
  return (
    <div className="panel">
      <ul>
        <PlaceholderRow />
        <PlaceholderRow />
        <PlaceholderRow />
      </ul>
    </div>
  );
}
