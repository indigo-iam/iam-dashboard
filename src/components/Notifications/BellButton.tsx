import { DrawerButton } from "@/components/Drawer/DrawerButton";
import { BellIcon } from "@heroicons/react/20/solid";
import React from "react";

type BellButtonProps = {
  children?: React.ReactNode;
  title: string;
};

export default function BellButton(props: Readonly<BellButtonProps>) {
  const { children, title } = props;
  return (
    <DrawerButton icon={<BellIcon />} title={title} href="/requests">
      {children}
    </DrawerButton>
  );
}
