// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { CloseButton } from "@headlessui/react";
import { BuildingLibraryIcon, UserIcon } from "@heroicons/react/24/outline";
import { setAdminMode, setUserMode } from "./actions";
import { refresh } from "next/cache";

export function AdminModeButton() {
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = document.getElementById("loading");
    element?.setAttribute("data-loading", "");
    await setAdminMode();
    refresh();
    element?.removeAttribute("data-loading");
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
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = document.getElementById("loading");
    element?.setAttribute("data-loading", "");
    await setUserMode();
    window.location.reload();
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
