// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Switch } from "@headlessui/react";
import { toggleAdminMode } from "./actions";

type AdminModeSwitchProps = {
  defaultChecked: boolean;
};

export async function AdminModeSwitch(props: Readonly<AdminModeSwitchProps>) {
  const { defaultChecked } = props;
  return (
    <div className="flex gap-2">
      <span className="text-sm whitespace-nowrap">Admin Mode</span>
      <Switch
        defaultChecked={defaultChecked}
        onChange={toggleAdminMode}
        name="admin-mode"
        className="group data-checked:bg-danger inline-flex h-5 w-10 items-center rounded-full bg-white/20 transition md:bg-gray-200 dark:bg-white/20"
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-5" />
      </Switch>
    </div>
  );
}
