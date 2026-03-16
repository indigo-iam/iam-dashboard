// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { useEffect } from "react";

export function toggleDrawer() {
  const drawer = document.getElementById("drawer");
  drawer?.toggleAttribute("data-open");
  const button = document.getElementById("backdrop-drawer-btn");
  button?.toggleAttribute("data-open");
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
    const button = document.getElementById("backdrop-drawer-btn");
    if (button?.hasAttribute("data-open")) {
      button?.removeAttribute("data-open");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("resize", close);
    };
  });

  return (
    <>
      <Button
        id="backdrop-drawer-btn"
        className="invisible fixed inset-0 z-20 bg-black/30 opacity-0 transition-opacity data-open:visible data-open:z-30 data-open:opacity-100 md:hidden"
        onClick={toggleDrawer}
      />
      <aside
        id="drawer"
        className="easy-in-out over visible fixed inset-0 top-14 z-30 w-0 -translate-x-full overflow-hidden bg-sky-950 duration-100 data-open:visible data-open:w-80 data-open:translate-x-0 md:visible md:w-80 md:translate-x-0"
        data-testid="sidebar"
      >
        {children}
      </aside>
    </>
  );
}
