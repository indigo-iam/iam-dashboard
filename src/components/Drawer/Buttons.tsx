"use client";
import { signOut } from "next-auth/react";
import {
  ArrowRightEndOnRectangleIcon,
  WrenchIcon,
} from "@heroicons/react/24/solid";
import { DrawerButton } from "./DrawerButton";
import Notifications from "@/components/Notifications";

export const DrawerButtons = () => {
  const logout = async () => {
    await signOut();
  };
  return (
    <div className="flex justify-around p-4">
      {/* <Notifications /> */}
      <DrawerButton icon={<WrenchIcon />} title="Settings" />
      <DrawerButton
        icon={<ArrowRightEndOnRectangleIcon />}
        title="Logout"
        onClick={logout}
      />
    </div>
  );
};
