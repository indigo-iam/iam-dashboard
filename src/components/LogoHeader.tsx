"use server";
import {
  ArrowRightEndOnRectangleIcon,
  BellIcon,
  UserCircleIcon,
  WrenchIcon,
} from "@heroicons/react/24/solid";
import { ReactNode } from "react";
import { useMe } from "@/services";
import { signOut } from "@/auth";
import Image from "next/image";

const LogoIam = () => {
  return (
    <div className="flex">
      <Image
        src="/cloud.png"
        width="0"
        height="0"
        sizes="100vw"
        className="w-28 my-auto"
        alt="INFN Cloud"
        priority={true}
      />
      <div className="infn-subtitle infn-txt-secondary px-4 py-2">
        INDIGO IAM for <br /> cnafsd
      </div>
    </div>
  );
};

const UserLogo = (props: { username: string }) => {
  const { username } = props;
  return (
    <div className="infn-logo-user">
      <div style={{ width: "48px", display: "flex" }}>
        <UserCircleIcon />
      </div>
      <div className="h5 px-4 my-auto">{username}</div>
    </div>
  );
};

const Divider = () => {
  return <div className="infn-divider" />;
};

interface ItemButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: "button" | "reset" | "submit";
  icon: ReactNode;
}

const ItemButton = (props: ItemButtonProps) => {
  const { icon, ...buttonProps } = props;
  buttonProps.className = "infn-btn icon infn-btn-primary";
  return (
    <button {...buttonProps}>
      <div style={{ width: "24px", height: "24px" }}>{icon}</div>
    </button>
  );
};

const Buttons = () => {
  const logout = async () => {
    "use server";
    await signOut();
  };
  return (
    <div className="flex justify-around px-4 pb-1">
      <form action={logout}>
        <ItemButton
          icon={<BellIcon />}
          title="Notifications"
          onClick={logout}
        />
        <ItemButton icon={<WrenchIcon />} title="Settings" onClick={logout} />
        <ItemButton
          icon={<ArrowRightEndOnRectangleIcon />}
          title="Logout"
          onClick={logout}
          type="submit"
        />
      </form>
    </div>
  );
};

export const LogoHeader = async () => {
  const { fetchMe } = useMe();
  const username = await (async () => {
    const me = await fetchMe();
    const { name } = me;
    return name.formatted ?? "Unknown User";
  })();
  return (
    <div id="logo-header" className="w-full p-2">
      <LogoIam />
      <UserLogo username={username} />
      <Buttons />
      <Divider />
    </div>
  );
};
