// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { toggleDrawer } from "./drawer";

export function ToggleDrawerButton() {
  return (
    <Button className="md:hidden" onClick={toggleDrawer}>
      <Bars3Icon className="p my-auto size-8 rounded fill-white hover:bg-white/30" />
    </Button>
  );
}
