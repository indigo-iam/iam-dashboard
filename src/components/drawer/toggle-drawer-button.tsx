// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { toggleDrawer } from "./drawer";

export function ToggleDrawerButton() {
  return (
    <Button
      className="md:hidden"
      onClick={toggleDrawer}
      title="Menu"
      data-testid="menu-btn"
    >
      <Bars3Icon className="fill-secondary size-8 cursor-pointer rounded-xl p-1 hover:bg-white/10" />
    </Button>
  );
}
