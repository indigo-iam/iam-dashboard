// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { NotificationType } from "@/components/toaster/types";
import { expect, Locator, Page } from "@playwright/test";

export async function changeTabPanel(button: Locator) {
  await expect(button).toBeVisible();
  await expect(button).toHaveAttribute(
    "aria-controls",
    /headlessui-tabs-panel-.*/
  );
  await button.click();
  await expect(button).toHaveAttribute("data-selected", "");
}

export async function dismissToast(page: Page, type: NotificationType) {
  const toast = page.getByTestId("toast");
  await expect(toast).toBeVisible();
  await expect(toast).toHaveAttribute("data-toast-type", type);
  const closeButton = toast.getByTitle("Close");
  await closeButton.click();
  await expect(toast).toBeHidden();
}
