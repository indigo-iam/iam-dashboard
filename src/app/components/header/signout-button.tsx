// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { signOut } from "@/auth";
import { CloseButton } from "@headlessui/react";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";

export function SignoutButton() {
  async function logout() {
    "use server";
    await signOut();
    redirect("/");
  }
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
