// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { signOut } from "@/auth/server";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/16/solid";
import { redirect } from "next/navigation";

export function SignoutButton() {
  const logout = async () => {
    "use server";
    await signOut();
    redirect("/");
  };
  return (
    <form action={logout}>
      <button
        type="submit"
        name="Sign Out"
        className="text-secondary flex w-full justify-center gap-4 rounded-md border border-white/30 bg-linear-to-b from-white/10 from-5% via-transparent via-50% to-white/10 to-95% p-2 hover:bg-white/10"
      >
        Sign Out
        <ArrowRightEndOnRectangleIcon className="size-6" />
      </button>
    </form>
  );
}
