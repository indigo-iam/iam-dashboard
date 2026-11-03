// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

import { PopoverOption } from "@/components/popover";
import { logout } from "./actions";

export function SignoutButton() {
  return (
    <PopoverOption type="button" data-testid="signout-btn" onClick={logout}>
      <ArrowRightStartOnRectangleIcon className="size-5" />
      Sign out
    </PopoverOption>
  );
}
