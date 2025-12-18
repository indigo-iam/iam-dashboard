// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useEffect } from "react";
import { auth } from "@/auth/client";

export function SignInButton() {
  useEffect(() => {
    auth.signIn.oauth2({
      providerId: "indigo-iam",
      callbackURL: "/",
    });
  });
  return null;
}
