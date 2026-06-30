// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import BaseLabelView from "@/components/badges/label-view";
import { deleteUserLabel } from "@/services/users";
import { toast } from "@/components/toaster";

type LabelViewProps = {
  isAdmin: boolean;
  userId: string;
  prefix: string;
  name: string;
  value: string | null;
};

export function LabelView(props: Readonly<LabelViewProps>) {
  const { isAdmin, userId, prefix, name, value } = props;
  async function deleteLabel() {
    const res = await deleteUserLabel(userId, prefix, name);
    if (res) {
      toast.toast(res);
    }
  }
  return (
    <BaseLabelView
      key={prefix}
      name={prefix}
      value={value ? `${name}:${value}` : name}
      onClick={isAdmin ? deleteLabel : undefined}
    />
  );
}
