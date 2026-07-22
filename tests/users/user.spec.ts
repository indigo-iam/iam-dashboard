// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Page } from "@playwright/test";
import { testUser, testAdmin, expect, enableAdminMode } from "../auth/fixture";
import { changeTabPanel, dismissToast, navigateToTestUserPage } from "../utils";

testUser(
  "user can send a request to join a group",
  async ({ signedUpPage }) => {
    const page = signedUpPage;
    await page.waitForURL("./users/me");

    await testUser.step("Select groups panel", async () => {
      const tab = page.getByText("GROUPS", { exact: true });
      await changeTabPanel(tab);
    });

    await testUser.step("Initially there are no pending requests", async () => {
      const heading = page.getByRole("heading", { name: "Pending requests" });
      await expect(heading).toBeHidden();
    });

    await testUser.step("User sends a request", async () => {
      await expect(
        page.getByRole("heading", { name: "Joined groups" })
      ).toBeVisible();
      const dialog = page
        .getByRole("dialog")
        .filter({ hasText: "Send join group request" });

      const joinBtn = page.getByRole("button", { name: "Join group" });
      await expect(joinBtn).toBeEnabled();
      await joinBtn.click();
      await expect(dialog).toBeVisible();

      const input = dialog.getByPlaceholder("Type to search for a group...");
      await expect(input).toBeVisible();
      await expect(input).toHaveAttribute("list", "search-group-join");
      await input.pressSequentially("Test-001", { delay: 150 });
      const motivation = dialog.getByRole("textbox");
      await motivation.fill("Test motivation message");
      await dialog.getByRole("button", { name: "Confirm" }).click();
      await dismissToast(page, "Group Request sent", "success");
    });

    await testUser.step("User must see its own pending request", async () => {
      const item = page
        .getByRole("listitem")
        .filter({ hasText: "Motivation: Test motivation message" });
      await expect(item).toBeVisible();
    });

    await testUser.step("User can revoke its own pending request", async () => {
      const item = page
        .getByRole("listitem")
        .filter({ hasText: "Motivation: Test motivation message" });
      const more = item.getByRole("button", { name: "More" });
      await expect(more).toBeEnabled();
      await more.click();
      const revokeOption = page.getByRole("button", { name: "Revoke request" });
      await expect(revokeOption).toBeVisible();
      await expect(revokeOption).toBeEnabled();
      await revokeOption.click();
      const dialog = page.getByRole("dialog").filter({ visible: true });
      await expect(dialog).toBeVisible();
      await dialog.getByRole("button", { name: "Revoke request" }).click();
      const pendingRequests = page.getByText("Pending requests");
      await expect(pendingRequests).toBeHidden();
    });
  }
);

async function openEditEndtimeModal(page: Page) {
  const dialog = page.getByRole("dialog").filter({ visible: true });
  const edit = page.getByRole("button", { name: "Edit" });
  await expect(edit).toBeVisible();
  await edit.click();
  await expect(dialog).toBeVisible();
  const heading = dialog.getByRole("heading").first();
  await expect(heading).toHaveText("Edit user endtime");
  return dialog;
}

testAdmin("admin can edit user's endtime", async ({ signedUpPage }) => {
  const page = signedUpPage;
  const endtime = page.getByLabel("Endtime date");

  await testAdmin.step("enable admin mode", async () => {
    await enableAdminMode(page);
  });

  await testAdmin.step("navigate to test user page", async () => {
    await navigateToTestUserPage(page);
  });

  await testAdmin.step("endtime is initially not set", async () => {
    await expect(endtime).toHaveAttribute("type", "date");
    await expect(endtime).toHaveValue("");
  });

  await testAdmin.step("cannot set endtime in the past", async () => {
    const dialog = await openEditEndtimeModal(page);
    const endtime = dialog.getByLabel("Endtime");
    await expect(endtime).toBeEnabled();
    await endtime.fill("1970-01-01");
    const save = dialog.getByRole("button", { name: "Save" });
    await expect(save).toBeEnabled();
    await save.click();
    await expect(dialog).toBeVisible();
    const cancel = dialog.getByRole("button", { name: "Cancel" });
    await expect(cancel).toBeEnabled();
    await cancel.click();
    await expect(dialog).toBeHidden();
    await expect(page.getByLabel("Endtime date")).toHaveValue("");
  });

  await testAdmin.step("can set endtime in the future", async () => {
    const dialog = await openEditEndtimeModal(page);
    const endtime = dialog.getByLabel("Endtime");
    await endtime.fill("2999-12-12");
    const save = dialog.getByRole("button", { name: "Save" });
    await expect(save).toBeEnabled();
    await save.click();
    await expect(dialog).toBeHidden();
    await expect(page.getByLabel("Endtime date")).toHaveValue("2999-12-12");
    await dismissToast(page, "Membership endtime updated", "success");
    await expect(dialog).toBeHidden();
  });

  await testAdmin.step("can revoke endtime", async () => {
    const dialog = await openEditEndtimeModal(page);
    const clear = dialog.getByLabel("Clear");
    await expect(clear).toBeEnabled();
    await clear.click();
    const save = dialog.getByRole("button", { name: "Save" });
    await save.click();
    await dismissToast(page, "Membership endtime revoked", "success");
    await expect(dialog).toBeHidden();
    await expect(endtime).toHaveValue("");
  });
});
