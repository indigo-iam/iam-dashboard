// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { startTransition } from "react";
import { CloseButton } from "@headlessui/react";
import { BuildingLibraryIcon, UserIcon } from "@heroicons/react/24/outline";

import { setAdminMode, setUserMode } from "./actions";

export function AdminModeButton() {
  function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const loading = document.getElementById("loading");
    loading?.setAttribute("data-loading", "");
    startTransition(async () => {
      await setAdminMode();
      startTransition(() => {
        loading?.removeAttribute("data-loading");
      });
    });
  }

  return (
    <form onSubmit={submit}>
      <CloseButton
        type="submit"
        name="Switch to admin"
        data-testid="admin-mode-btn"
        className="btn-user-popover"
      >
        <BuildingLibraryIcon className="size-5" />
        Admin mode
      </CloseButton>
    </form>
  );
}

export function UserModeButton() {
  function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const loading = document.getElementById("loading");
    startTransition(async () => {
      loading?.setAttribute("data-loading", "");
      await setUserMode();
      startTransition(() => {
        loading?.removeAttribute("data-loading");
      });
    });
  }

  return (
    <form onSubmit={submit}>
      <CloseButton
        type="submit"
        name="Switch to user mode"
        data-testid="user-mode-btn"
        className="btn-user-popover"
      >
        <UserIcon className="size-5" />
        User mode
      </CloseButton>
    </form>
  );
}
