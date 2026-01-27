// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useEffect } from "react";

export function SignInButton() {
  useEffect(() => {
    document.getElementById("signin-button")?.click();
  });
  return <button id="signin-button" type="submit" hidden />;
}
