// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { redirect } from "next/navigation";
import { getSession } from "@/auth";
import { SignInButton } from "./components/signin-button";
import { login } from "./actions";

export default async function SignInPage() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className="bg-secondary dark:bg-infn flex h-screen items-center justify-center">
      <form action={login}>
        Redirecting to login page...
        <SignInButton />
      </form>
    </div>
  );
}
