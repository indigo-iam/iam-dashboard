// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Group, GroupLabel } from "@/models/groups";
import { deleteGroupLabel } from "@/services/groups";
import { XCircleIcon } from "@heroicons/react/16/solid";

type LabelProps = {
  group: Group;
  label: GroupLabel;
};

export default function LabelView(props: Readonly<LabelProps>) {
  const { group, label } = props;
  const action = async () => {
    "use server";
    await deleteGroupLabel(group.id, label);
  };
  return (
    <form
      action={action}
      className="flex items-center gap-1 rounded-full bg-sky-500 px-2 py-0.5 text-sm text-white dark:bg-sky-800/30 dark:text-sky-400/80"
    >
      <span>
        <b>{label.name}</b> {label.value}
      </span>
      <button
        id={`delete-label-${label.name}`}
        title={`Delete ${label.name} ${label.value}`.trimEnd()}
        type="submit"
        className="cursor-pointer"
      >
        <XCircleIcon className="size-4 hover:text-gray-300" />
      </button>
    </form>
  );
}
