"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function BurgerButton(props: { sidebarId: string }) {
  const { sidebarId } = props;

  function toggleSidebar() {
    const sidebar = document.getElementById(sidebarId);
    if (!sidebar) {
      console.warn(`element with id '${sidebarId}' not found`);
      return;
    }
    sidebar?.classList.toggle("show-sidebar");

    const dismissButton = document.getElementById("sidebar-dismiss-btn");
    dismissButton?.classList.toggle("hidden");
  }

  return (
    <button
      className="hover:bg-primary-hover my-auto rounded-md p-1 transition active:bg-primary-200 lg:hidden"
      onClick={toggleSidebar}
    >
      <Bars3Icon className="w-8 text-secondary" />
    </button>
  );
}
