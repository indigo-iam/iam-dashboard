// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ToastTypes } from "@/components/toaster";
import { expect, Locator, Page } from "@playwright/test";

export async function changeTabPanel(button: Locator) {
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
  await expect(button).toHaveAttribute(
    "aria-controls",
    /headlessui-tabs-panel-.*/
  );
  await button.click();
  await expect(button).toHaveAttribute("data-selected", "");
}

export async function dismissToast(
  page: Page,
  title: string,
  type: ToastTypes
) {
  const toast = page.getByTestId("toast");
  await expect(toast).toBeVisible();
  await expect(toast).toHaveCount(1);
  await expect(toast).toHaveAttribute("data-toast-type", type);
  await expect(toast.getByRole("paragraph").first()).toHaveText(title);
  const closeButton = toast.getByTitle("Close");
  await expect(closeButton).toBeVisible();
  await expect(closeButton).toBeEnabled();
  await expect(closeButton).toBeInViewport();
  await closeButton.click();
  await expect(toast).toBeHidden();
}

export async function navigateToTestUserPage(page: Page) {
  await page.goto("./users");
  const newUserBtn = page.getByRole("button", { name: "New user" });
  await expect(newUserBtn).toBeEnabled(); // wait for page fully loaded
  const searchbar = page.getByPlaceholder("Type to search a user");
  await searchbar.pressSequentially("test user");
  const testUser = page.getByRole("link").filter({ hasText: "Test User" });
  const users = page.locator(".iam-list-item").filter({ visible: true });
  await expect(users).toHaveCount(1);
  await expect(users).toBeEnabled();
  await testUser.click();
  await page.waitForURL("./users/*");
  const heading = page.getByRole("heading").filter({ hasText: "Test User" });
  await expect(heading).toBeVisible();
  const save = page.getByRole("button", { name: "Save changes" });
  await expect(save).toBeVisible();
}
