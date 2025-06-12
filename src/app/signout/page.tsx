// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { settings } from "@/config";
import { SignOutButton } from "./components/signout-button";

const { BASE_URL } = settings;

export default async function SignoutPage() {
  const session = await auth();
  async function action() {
    "use server";
    if (session) {
      await signOut({ redirect: false });
      redirect(`${BASE_URL}/logout`);
    }
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <form className="text-xl" action={action}>
        Signing out...
        <SignOutButton />
      </form>
    </div>
  );
}
