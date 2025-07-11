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
    <div id="drawer" className="group">
      <Button
        id="backdrop-drawer-button"
        className="fixed inset-0 -z-10 bg-black/30 opacity-0 transition-opacity group-data-[open]:z-30 group-data-[open]:opacity-100 md:hidden"
        onClick={toggleDrawer}
      />
      <aside className="bg-infn easy-in-out fixed inset-0 z-30 w-80 -translate-x-full space-y-4 overflow-auto duration-100 group-data-[open]:translate-x-0 md:translate-x-0">
        {children}
      </aside>
    </div>
  );
}
