// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Field, Label } from "@/components/form";
import { Info } from "@/components/info";
import { Input } from "@/components/inputs";
import { toast } from "@/components/toaster";
import { changeMembershipEndTime } from "@/services/users";

type EditEndTimeProps = {
  userId: string;
  userName: string;
  userFormattedName: string;
  userEndTime?: string;
};

export function EditEndTime(props: Readonly<EditEndTimeProps>) {
  const { userId, userEndTime } = props;
  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const date = event.target.value;
    const res = await changeMembershipEndTime(userId, date);
    toast.toast(res);
  }

  return (
    <Field>
      <div className="flex items-center gap-1">
        <Label>Endtime date</Label>
        <Info className="pb-1.5" anchor="left">
          After this date user will be automatically disabled.
        </Info>
      </div>
      <Input defaultValue={userEndTime} type="date" onChange={handleChange} />
    </Field>
  );
}
