"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SignIn() {
  const { data, status } = useSession();
  const router = useRouter();
  const signedIn = useRef(false);
  const signingIn = useRef(false);

  useEffect(() => {
    const login = async () => {
      switch (status) {
        case "unauthenticated":
          if (!signingIn.current) {
            console.debug("signing in, redirecting to IAM login service...");
            await signIn("indigo-iam");
            signingIn.current = true;
          }
          break;
        case "loading":
          break;
        case "authenticated":
          if (!signedIn.current) {
            signedIn.current = true;
            console.debug("authenticated, redirecting to home");
            router.push("/");
          }
          break;
      }
    };
    login();
  }, [router, status, data]);
  return <div>Redirecting to login page...</div>;
}
