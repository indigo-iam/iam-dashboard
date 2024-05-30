"use client";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { signOut } from "next-auth/react";

export default function SignOut() {
  const { status } = useSession();
  const signingOut = useRef(false);
  useEffect(() => {
    const logout = async () => {
      if (status === "authenticated" && !signingOut.current) {
        console.log("signing out...");
        await signOut({ redirect: true, callbackUrl: "/" });
        signingOut.current = true;
      }
    };
    logout();
  }, [status]);
  return <div>Logging out...</div>;
}
