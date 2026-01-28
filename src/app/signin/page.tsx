// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { redirect } from "next/navigation";
import { getSession, signIn } from "@/auth";
import { settings } from "@/config";
import { SignInButton } from "./components/signin-button";

const { IAM_DASHBOARD_BASE_PATH } = settings;
const basePath = IAM_DASHBOARD_BASE_PATH === "" ? "/" : IAM_DASHBOARD_BASE_PATH;

export default async function SignInPage() {
  const session = await getSession();
  if (session) {
    redirect(basePath);
  }

  async function action() {
    "use server";
    await signIn();
  }

  return (
    <div className="bg-secondary dark:bg-infn flex h-screen items-center justify-center">
      <form action={action}>
        Redirecting to login page...
        <SignInButton />
      </form>
    </div>
  );
}
