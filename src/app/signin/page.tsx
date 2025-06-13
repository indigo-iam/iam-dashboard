// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { SignInButton } from "./components/signin-button";

export default async function SignInPage() {
  const session = await auth();
  async function action() {
    "use server";
    if (!session) {
      await signIn("indigo-iam");
    } else if (session.expired) {
      redirect("/signout");
    } else {
      redirect("/");
    }
  }
  return (
    <div className="bg-secondary dark:bg-infn flex h-screen items-center justify-center">
      <form className="text-xl" action={action}>
        Redirecting to login page...
        <SignInButton />
      </form>
    </div>
  );
}
