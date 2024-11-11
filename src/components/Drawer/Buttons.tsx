import { signOut } from "next-auth/react";
import {
  ArrowRightEndOnRectangleIcon,
  WrenchIcon,
} from "@heroicons/react/24/solid";
import { DrawerButton } from "./DrawerButton";
import Notifications from "@/components/Notifications";
import { auth } from "@/auth";

export const DrawerButtons = async () => {
  const session = await auth();
  const logout = async () => {
    await signOut();
  };
  return (
    <div className="flex justify-around p-4">
      {session?.is_admin ? <Notifications /> : null}
      <DrawerButton icon={<WrenchIcon />} title="Settings" href="/settings" />
      <DrawerButton
        icon={<ArrowRightEndOnRectangleIcon />}
        title="Logout"
        href="/signout"
      />
    </div>
  );
};
