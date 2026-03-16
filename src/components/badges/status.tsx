// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type StatusProps = {
  active: boolean;
};

export default function Status(props: Readonly<StatusProps>) {
  const { active } = props;
  const status = active ? "Active" : "Disabled";
  const title = `${active ? "Active" : "Disabled"}`;
  return (
    <span
      title={title}
      className="text-danger bg-danger data-[status=Active]:bg-success dark:lg:bg-danger dark:text-secondary dark:lg:data-[status=Active]:bg-success dark:lg:data-[status=Active]:text-secondary flex max-w-fit items-center rounded-full p-0.5 text-xs font-medium lg:bg-red-200 lg:px-2 lg:data-[status=Active]:bg-lime-100 lg:data-[status=Active]:text-lime-700"
      data-status={status}
      aria-label={title}
    >
      <span className="hidden lg:inline-block">{status}</span>
    </span>
  );
}
