// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import test, { expect } from "@playwright/test";
import { login, TEST_USER } from "../auth/fixture";
import { changeTabPanel, dismissToast } from "../utils";

test("User can send a request to join a group", async ({ page }) => {
  await test.step("Login as user", async () => {
    await login(page, TEST_USER);
    await page.goto("./users/me");
  });

  await test.step("Select groups panel", async () => {
    const tab = page.getByText("GROUPS", { exact: true });
    await changeTabPanel(tab);
  });

  await test.step("Initially there are no pending requests", async () => {
    const heading = page.getByRole("heading", { name: "Pending requests" });
    await expect(heading).toBeHidden();
  });

  await test.step("User sends a request", async () => {
    await expect(
      page.getByRole("heading", { name: "Joined groups" })
    ).toBeVisible();
    const dialog = page
      .getByRole("dialog")
      .filter({ hasText: "Send join group request" });
    await expect(async () => {
      const joinBtn = page.getByRole("button", { name: "Join group" });
      await joinBtn.click();
      await expect(dialog).toBeVisible();
    }).toPass();

    const input = dialog.getByPlaceholder("Type to search for a group...");
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute("list", "search-group-join");
    await input.pressSequentially("Test-001", { delay: 150 });
    const motivation = dialog.getByRole("textbox");
    await motivation.fill("Test motivation message");
    await dialog.getByRole("button", { name: "Confirm" }).click();
    await dismissToast(page, "Group Request sent", "success");
  });

  await test.step("User must see its own pending request", async () => {
    const item = page
      .getByRole("listitem")
      .filter({ hasText: "Motivation: Test motivation message" });
    await expect(item).toBeVisible();
  });

  await test.step("User can revoke its own pending request", async () => {
    const item = page
      .getByRole("listitem")
      .filter({ hasText: "Motivation: Test motivation message" });
    const more = item.getByRole("button", { name: "More" });
    const revokeOption = page.getByRole("button", { name: "Revoke request" });
    await expect(async () => {
      await more.click();
      await expect(revokeOption).toBeVisible();
    }).toPass();
    const dialog = page.getByRole("dialog").filter({ visible: true });
    await expect(async () => {
      await revokeOption.click();
      await expect(dialog).toBeVisible();
    }).toPass();
    await dialog.getByRole("button", { name: "Revoke request" }).click();
    const pendingRequests = page.getByText("Pending requests");
    await expect(pendingRequests).toBeHidden();
  });
});
