// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function BurgerButton(props: Readonly<{ drawerId: string }>) {
  const { drawerId } = props;

  function toggleSidebar() {
    const sidebar = document.getElementById(drawerId);
    if (!sidebar) {
      console.warn(`element with id '${drawerId}' not found`);
      return;
    }
    sidebar?.classList.toggle("show-sidebar");

    const dismissButton = document.getElementById(`${drawerId}-dismiss-btn`);
    dismissButton?.classList.toggle("hidden");
  }

  return (
    <button
      className="my-auto rounded-md p-1 transition hover:bg-white/10 active:bg-white/20 lg:hidden"
      onClick={toggleSidebar}
    >
      <Bars3Icon className="text-secondary w-8" />
    </button>
  );
}
