// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { SignOutButton } from "./components/signout-button";
import { cookies } from "next/headers";

export default async function SignoutPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  async function action() {
    "use server";
    const cookiesStore = await cookies();
    cookiesStore.delete("JSESSIONID"); // logout from indigo-iam
    await signOut();
  }

  return (
    <div className="bg-secondary dark:bg-infn flex h-screen items-center justify-center">
      <form className="text-xl" action={action}>
        Signing out...
        <SignOutButton />
      </form>
    </div>
  );
}
