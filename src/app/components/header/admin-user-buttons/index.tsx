// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { usePathname, useRouter } from "next/navigation";
import { BuildingLibraryIcon, UserIcon } from "@heroicons/react/24/outline";

import { useLoading } from "@/components/loading";
import { PopoverOption } from "@/components/popover";
import { setAdminMode, setUserMode } from "./actions";

export function AdminModeButton() {
  const router = useRouter();
  const { startLoadingTransition } = useLoading();

  function handleClick() {
    startLoadingTransition(async () => {
      await setAdminMode();
      router.refresh();
    });
  }

  return (
    <PopoverOption
      type="button"
      data-testid="admin-mode-btn"
      onClick={handleClick}
    >
      <BuildingLibraryIcon className="size-5" />
      Admin mode
    </PopoverOption>
  );
}

export function UserModeButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { startLoadingTransition } = useLoading();

  function handleClick() {
    startLoadingTransition(async () => {
      if (pathname.startsWith("/clients/")) {
        router.push("/clients");
      }
      await setUserMode();
      router.refresh();
    });
  }

  return (
    <PopoverOption
      type="button"
      data-testid="user-mode-btn"
      onClick={handleClick}
    >
      <UserIcon className="size-5" />
      User mode
    </PopoverOption>
  );
}
