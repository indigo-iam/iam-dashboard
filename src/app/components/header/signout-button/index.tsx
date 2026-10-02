// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

import { PopoverButton } from "@/components/popover";
import { logout } from "./actions";

export function SignoutButton() {
  return (
    <form action={logout}>
      <PopoverButton type="submit" name="Sign out" data-testid="signout-btn">
        <ArrowRightStartOnRectangleIcon className="size-5" />
        Sign out
      </PopoverButton>
    </form>
  );
}
