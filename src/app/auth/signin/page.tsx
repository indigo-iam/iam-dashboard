// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { SessionProvider } from "next-auth/react";
import { LoginForm } from "./components/signin-form";

export default function SignIn() {
  return (
    <SessionProvider>
      Redirecting to login page...
      <LoginForm />
    </SessionProvider>
  );
}
