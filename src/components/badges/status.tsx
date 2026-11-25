// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type StatusProps = {
  active: boolean;
  autoHide?: boolean;
};

export default function Status(props: Readonly<StatusProps>) {
  const { active, autoHide } = props;
  const title = `${active ? "Active" : "Disabled"}`;
  return (
    <div
      title={title}
      className="flex min-w-fit items-center"
      data-enabled={active}
      data-autohide={autoHide}
      aria-label={title}
    >
      <span
        className="text-danger data-enabled:text-success dark:bg-danger dark:data-enabled:bg-success inline-block rounded-full bg-red-100 px-2 py-0.5 text-xs data-autohide:hidden data-enabled:bg-green-100 lg:data-autohide:inline-block dark:text-white dark:data-enabled:text-white"
        data-enabled={active || null}
        data-autohide={autoHide || null}
      >
        {title}
      </span>
      <div
        className="bg-danger data-enabled:bg-success hidden size-2 rounded-full data-autohide:block lg:data-autohide:hidden"
        data-enabled={active || null}
        data-autohide={autoHide || null}
      />
    </div>
  );
}
