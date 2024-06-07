"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Logout() {
  const { status } = useSession();
  const router = useRouter();
  const signingOutRef = useRef(false);

  useEffect(() => {
    switch (status) {
      case "authenticated":
        if (!signingOutRef.current) {
          console.log("signing out...");
          signOut();
          signingOutRef.current = true;
        }
        break;
      case "unauthenticated":
        router.push("/");
        break;
      case "loading":
        console.log("loading");
        break;
      default:
    }
  });
  return (
    <h1>Logout Page</h1>
  )
}
