"use client";
import { logout } from "@/services/auth";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    logout();
  }, []);
  return <div>Redirecting to login page...</div>;
}
