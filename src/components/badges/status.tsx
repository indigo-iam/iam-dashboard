// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type StatusProps = {
  active: boolean;
};

export default function Status(props: Readonly<StatusProps>) {
  const { active } = props;
  const title = `${active ? "Active" : "Disabled"}`;
  return (
    <div
      title={title}
      className="text-danger data-[enabled=true]:text-success rounded-full bg-red-100 px-2 py-0.5 text-xs data-[enabled=true]:bg-green-100"
      data-enabled={active}
      aria-label={title}
    >
      <span className="inline-block">{title}</span>
    </div>
  );
}
