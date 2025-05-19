// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use server";

import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { settings } from "@/config";

const { BASE_URL } = settings;

export async function Logout() {
  async function action() {
    "use server";
    await signOut({ redirect: false });
    redirect(`${BASE_URL}/logout`);
  }

  return (
    <form
      action={action}
      className="m-auto flex rounded-full p-2 hover:bg-white/10"
    >
      <button type="submit" className="text-secondary size-6">
        <ArrowRightEndOnRectangleIcon />
      </button>
    </form>
  );
}
