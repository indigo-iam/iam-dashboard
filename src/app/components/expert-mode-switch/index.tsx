// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Switch } from "@headlessui/react";
import { toggleExpertMode } from "./actions";

type ExpertModeSwitchProps = {
  defaultChecked: boolean;
  isAdmin: boolean;
};

export async function ExpertModeSwitch(props: Readonly<ExpertModeSwitchProps>) {
  const { defaultChecked, isAdmin } = props;
  if (!isAdmin) {
    return null;
  }
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Expert mode</span>
      <Switch
        defaultChecked={defaultChecked}
        onChange={toggleExpertMode}
        name="expert-mode"
        className="group data-checked:bg-danger inline-flex h-5 w-10 items-center rounded-full bg-gray-200 transition"
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-5" />
      </Switch>
    </div>
  );
}
