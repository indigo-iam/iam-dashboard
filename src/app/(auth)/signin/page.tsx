"use client";
import { login } from "@/services/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      login();
    } else if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);
  return <div>Redirecting to login page...</div>;
}
