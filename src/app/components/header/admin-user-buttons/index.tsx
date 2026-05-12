// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useRouter } from "next/navigation";
import { CloseButton } from "@headlessui/react";
import { BuildingLibraryIcon, UserIcon } from "@heroicons/react/24/outline";

import { setAdminMode, setUserMode } from "./actions";
import { useLoading } from "@/components/loading";

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
      <CloseButton
        type="submit"
        name="Switch to admin"
        data-testid="admin-mode-btn"
        className="btn-popover"
      >
        <BuildingLibraryIcon className="size-5" />
        Admin mode
      </CloseButton>
    </form>
  );
}

export function UserModeButton() {
  const router = useRouter();
  const { startLoadingTransition } = useLoading();

  function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    startLoadingTransition(async () => {
      await setUserMode();
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit}>
      <CloseButton
        type="submit"
        name="Switch to user mode"
        data-testid="user-mode-btn"
        className="btn-popover"
      >
        <UserIcon className="size-5" />
        User mode
      </CloseButton>
    </form>
  );
}
