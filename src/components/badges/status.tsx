// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type StatusProps = {
  active: boolean;
};

export default function Status(props: Readonly<StatusProps>) {
  const { active } = props;
  const status = active ? "Active" : "Disabled";
  return (
    <small
      title={`${active ? "Active" : "Disabled"}`}
      className="data-[status=disabled] bg-danger text-secondary data-[status=Active]:bg-success max-w-fit max-h-5 rounded-full p-0.5 px-2 text-xs"
      data-status={status}
    >
      {status}
    </small>
  );
}
