// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useEffect } from "react";

export function SignOutButton() {
  useEffect(() => {
    document.getElementById("signout-button")?.click();
  });
  return <button id="signout-button" type="submit" hidden />;
}
