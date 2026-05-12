// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { CloseButton } from "@headlessui/react";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { logout } from "./actions";

export function SignoutButton() {
  return (
    <form action={logout}>
      <CloseButton
        type="submit"
        name="Sign out"
        data-testid="signout-btn"
        className="btn-popover"
      >
        <ArrowRightStartOnRectangleIcon className="size-5" />
        Sign out
      </CloseButton>
    </form>
  );
}
