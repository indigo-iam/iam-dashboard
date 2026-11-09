// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type PanelProps = React.HTMLAttributes<HTMLElement> & {
  ref?: React.RefObject<HTMLDivElement | null>;
};

export function Panel(props: Readonly<PanelProps>) {
  const outerClassName = props.className ? ` ${props.className}` : "";
  return (
    <div
      {...props}
      className={
        "space-y-4 rounded-lg border bg-white p-4 text-gray-500 sm:px-8 sm:py-4 dark:border dark:bg-gray-800 dark:text-gray-400" +
        outerClassName
      }
    />
  );
}
