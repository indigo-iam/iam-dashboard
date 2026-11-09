// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type UnordererListProps = React.HTMLAttributes<HTMLElement>;

export function UnorderedList(props: Readonly<UnordererListProps>) {
  return <ul {...props} />;
}

type ListItemProps = React.HTMLAttributes<HTMLElement>;

export function ListItem(props: Readonly<ListItemProps>) {
  return (
    <li
      {...props}
      className="flex flex-row items-center rounded-l-sm border-b border-l-4 border-l-transparent p-2 py-3 text-gray-500 transition last:border-transparent hover:bg-neutral-50 dark:text-gray-400 dark:hover:bg-neutral-200/10 lg:gap-2"
    />
  );
}
