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
      className="text-secondary flex items-center gap-1 rounded-full bg-sky-400 px-2 py-0.5 text-sm"
    >
      <span>
        <b>{label.name}</b> {label.value}
      </span>
      <button
        id={`delete-label-${label.name}`}
        title={`Delete ${label.name} ${label.value}`.trimEnd()}
        type="submit"
      >
        <XCircleIcon className="hover:text-light-gray size-4" />
      </button>
    </form>
  );
}
