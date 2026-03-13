// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { useEffect } from "react";

export function toggleDrawer() {
  const drawer = document.getElementById("drawer");
  drawer?.toggleAttribute("data-open");
}

type DrawerProps = {
  children?: React.ReactNode;
};

export function Drawer(props: Readonly<DrawerProps>) {
  const { children } = props;

  const close = () => {
    const drawer = document.getElementById("drawer");
    if (drawer?.hasAttribute("data-open")) {
      drawer?.removeAttribute("data-open");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("resize", close);
    };
  });

  return (
    <div id="drawer" className="group" data-testid="drawer">
      <Button
        id="backdrop-drawer-button"
        className="invisible fixed inset-0 z-20 bg-black/30 opacity-0 transition-opacity group-data-open:visible group-data-open:z-30 group-data-open:opacity-100 md:hidden"
        onClick={toggleDrawer}
      />
      <aside
        className="easy-in-out invisible absolute inset-y-0 top-14 z-30 h-full w-0 -translate-x-full space-y-4 overflow-auto bg-sky-950 duration-100 group-data-open:visible group-data-open:w-80 group-data-open:translate-x-0 md:visible md:static md:w-80 md:translate-x-0"
        data-testid="sidebar"
      >
        {children}
      </aside>
    </div>
  );
}
