"use client";
import { signOut } from "next-auth/react";
import {
  ArrowRightEndOnRectangleIcon,
  BellIcon,
  WrenchIcon,
} from "@heroicons/react/24/solid";

type ItemButtonProps = {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
};

const ItemButton = (props: Readonly<ItemButtonProps>) => {
  const { icon, title, onClick } = props;
  return (
    <button
      className="hover:bg-primary-hover rounded-full p-3"
      title={title}
      onClick={onClick}
      type="button"
    >
      <div className="h-6 w-6">{icon}</div>
    </button>
  );
};

export const DrawerButtons = () => {
  const logout = async () => {
    await signOut();
  };
  return (
    <div className="flex justify-around p-4">
      <ItemButton icon={<BellIcon />} title="Notifications" />
      <ItemButton icon={<WrenchIcon />} title="Settings" />
      <ItemButton
        icon={<ArrowRightEndOnRectangleIcon />}
        title="Logout"
        onClick={logout}
      />
    </div>
  );
};
