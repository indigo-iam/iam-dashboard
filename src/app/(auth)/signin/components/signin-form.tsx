// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function LoginForm() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    document.getElementById("login-form-button")?.click();
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleLogin = async () => {
    await signIn("indigo-iam");
  };

  return (
    <form action={handleLogin}>
      <button id="login-form-button" type="submit" />
    </form>
  );
}
