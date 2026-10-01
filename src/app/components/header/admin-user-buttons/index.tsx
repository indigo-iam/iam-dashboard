// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { usePathname, useRouter } from "next/navigation";
import { BuildingLibraryIcon, UserIcon } from "@heroicons/react/24/outline";

import { useLoading } from "@/components/loading";
import { PopoverButton } from "@/components/popover";
import { setAdminMode, setUserMode } from "./actions";

export function AdminModeButton() {
  const router = useRouter();
  const { startLoadingTransition } = useLoading();

  function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    startLoadingTransition(async () => {
      await setAdminMode();
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit}>
      <PopoverButton
        type="submit"
        name="Switch to admin mode"
        data-testid="admin-mode-btn"
      >
        <BuildingLibraryIcon className="size-5" />
        Admin mode
      </PopoverButton>
    </form>
  );
}

export function UserModeButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { startLoadingTransition } = useLoading();

  function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    startLoadingTransition(async () => {
      if (pathname.startsWith("/clients/")) {
        router.push("/clients");
      }
      await setUserMode();
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit}>
      <PopoverButton
        type="submit"
        name="Switch to user mode"
        data-testid="user-mode-btn"
      >
        <UserIcon className="size-5" />
        User mode
      </PopoverButton>
    </form>
  );
}
