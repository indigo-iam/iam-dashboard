// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useEffect, useRef } from "react";

export function SignInButton() {
  const loadingRef = useRef(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!loadingRef.current) {
      document.getElementById("signin-button")?.click();
      loadingRef.current = false;
    }
    return () => {
      loadingRef.current = false;
    };
  });
  return <button id="signin-button" ref={buttonRef} type="submit" hidden />;
}
