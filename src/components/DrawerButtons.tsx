"use server";
import { signOut } from "@/auth";
import {
  ArrowRightEndOnRectangleIcon,
  BellIcon,
  WrenchIcon,
} from "@heroicons/react/24/solid";
import { ReactNode } from "react";

interface ItemButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: "button" | "reset" | "submit";
  icon: ReactNode;
}

const ItemButton = (props: ItemButtonProps) => {
  const { icon, ...buttonProps } = props;
  buttonProps.className = "infn-btn icon infn-btn-primary";
  return (
    <button {...props}>
      <div style={{ width: "24px", height: "24px" }}>{icon}</div>
    </button>
  );
};

export const DrawerButtons = () => {
  const logout = async () => {
    "use server";
    console.log("logout");
    await signOut();
  };
  return (
    <div className="flex justify-around px-4 pb-1">
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
