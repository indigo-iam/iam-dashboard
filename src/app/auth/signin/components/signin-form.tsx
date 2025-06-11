// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function LoginForm() {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    switch (status) {
      case "unauthenticated":
        signIn("indigo-iam");
        break;
      case "authenticated":
        if (data.expired) {
          signOut();
        } else {
          router.push("/");
        }
        break;
      default:
        break;
    }
  }, [status, router]);

  return null;
}
