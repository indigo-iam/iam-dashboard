// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";

type DrawerProps = {
  title?: string;
  children?: React.ReactNode;
};

export function Drawer(props: Readonly<DrawerProps>) {
  const { title, children } = props;
  const [show, setShow] = useState(false);

  const toggleDrawer = () => {
    const drawer = document.getElementById("drawer");
    drawer?.classList.toggle("translate-x-0");
    setShow(!show);
  };

  return (
    <>
      <Button
        id="backdrop-drawer-button"
        className="fixed inset-0 -z-10 bg-black/30 opacity-0 transition-opacity data-[show=true]:z-20 data-[show=true]:opacity-100 md:hidden"
        onClick={toggleDrawer}
        data-show={show}
      />
      <header className="bg-infn t-0 text-secondary fixed inset-0 z-30 flex h-16 items-center justify-between px-4 py-2 text-2xl font-bold md:hidden">
        <span className="line-clamp-2">{title}</span>
        <Button className="flex" onClick={toggleDrawer}>
          <Bars3Icon className="p my-auto size-8 rounded fill-white hover:bg-white/30" />
        </Button>
      </header>
      <aside
        id="drawer"
        className="bg-infn easy-in-out fixed inset-0 z-30 w-80 -translate-x-full space-y-6 duration-100 md:translate-x-0"
      >
        {children}
      </aside>
    </>
  );
}
