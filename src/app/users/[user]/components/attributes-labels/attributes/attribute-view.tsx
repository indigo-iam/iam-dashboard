// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import BaseLabelView from "@/components/badges/label-view";
import { toast } from "@/components/toaster";
import { Attribute } from "@/models/attributes";
import { deleteAttribute } from "@/services/users";

type AttributeViewProps = {
  isAdmin: boolean;
  userId: string;
  attr: Attribute;
};

export function AttributeView(props: Readonly<AttributeViewProps>) {
  const { isAdmin, userId, attr } = props;
  async function deleteLabel() {
    const res = await deleteAttribute(userId, attr);
    if (res) {
      toast.toast(res);
    }
  }
  return (
    <BaseLabelView
      key={`${attr.name}-${attr.value}`}
      name={attr.name}
      value={attr.value}
      onClick={isAdmin ? deleteLabel : undefined}
    />
  );
}
