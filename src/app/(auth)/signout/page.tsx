"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef } from "react";

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
