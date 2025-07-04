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
      className="data-[status=disabled] bg-danger data-[status=Active]:bg-success flex size-4 max-w-fit flex-none items-center rounded-full p-0.5 px-2 text-xs text-white sm:h-5 sm:min-w-max"
      data-status={status}
      aria-label={title}
    >
      <span className="hidden sm:block">{status}</span>
    </span>
  );
}
