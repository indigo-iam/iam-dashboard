// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { logout } from "@/services/auth";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    const doSignOut = async () => {
      await signOut();
      await logout();
    };
    doSignOut();
  }, []);
  return <div>Redirecting to login page...</div>;
}
