// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { testAdmin, testUser, enableAdminMode, expect } from "../auth/fixture";
import { Page } from "@playwright/test";
import { dismissToast } from "../utils";

async function openEditModal(page: Page) {
  const editBtn = page.getByRole("button", { name: "Edit AUP" });
  await expect(editBtn).toBeEnabled();
  await editBtn.click();
  const dialog = page.getByRole("dialog").filter({ visible: true });
  await expect(dialog).toBeVisible();
  const heading = dialog.getByRole("heading");
  await expect(heading).toHaveText("Edit AUP for this organization");
  return dialog;
}

testUser("User cannot see AUP page", async ({ signedUpPage }) => {
  const page = signedUpPage;
  await page.goto("./aup");
  await page.waitForURL("./users/me");
});

testAdmin(
  "Admin cannot see AUP page in user mode",
  async ({ signedUpPage }) => {
    const page = signedUpPage;
    await page.goto("./aup");
    await page.waitForURL("./users/me");
  }
);

testAdmin.describe("Admin can create/edit/delete the AUP", () => {
  testAdmin.afterEach("Delete AUP", async ({ signedUpPage }) => {
    const page = signedUpPage;
    await page.goto("./aup");
    const deleteBtn = page.getByRole("button", { name: "Delete AUP" });
    await expect(deleteBtn).toBeVisible();
    await expect(deleteBtn).toBeEnabled();
    await deleteBtn.click();
    const dialog = page.getByRole("dialog").filter({ visible: true });
    const heading = dialog.getByRole("heading");
    await expect(heading).toHaveText(
      "Delete the Acceptable Usage Policy for this organization?"
    );
    const confirmBtn = dialog.getByRole("button", { name: "Delete" });
    await expect(confirmBtn).toBeVisible();
    await expect(confirmBtn).toBeEnabled();
    await confirmBtn.click();
    await dismissToast(page, "AUP deleted", "success");
    await expect(
      page.getByText("AUP is not defined for this organization.")
    ).toBeVisible();
  });

  testAdmin(
    "Admin can create and edit a non-expiring AUP",
    async ({ signedUpPage }) => {
      const page = signedUpPage;

      await testAdmin.step("enable admin mode", async () => {
        await enableAdminMode(page);
      });

      await page.goto("./aup");
      const heading = page.getByRole("heading", {
        name: "Acceptable Usage Policy",
      });
      await expect(heading).toBeVisible();

      await testAdmin.step("AUP is initially not defined", async () => {
        await expect(
          page.getByText("AUP is not defined for this organization")
        ).toBeVisible();
      });

      await testAdmin.step("Create AUP", async () => {
        const createAupBtn = page.getByRole("button", { name: "Create AUP" });
        await expect(createAupBtn).toBeEnabled();
        await createAupBtn.click();
        const dialog = page.getByRole("dialog").filter({
          hasText: "Create the Acceptable Usage Policy for this organization",
        });
        await expect(dialog).toBeVisible();
        await expect(
          dialog.getByRole("button", { name: "Create AUP" })
        ).toBeDisabled();

        const url = dialog.getByLabel("Acceptable Usage Policy URL");
        await expect(url).toHaveAttribute("required");

        await expect(url).toHaveAttribute("type", "url");
        await url.fill("http://example.org");

        const validity = dialog.getByLabel("AUP signature validity (in days)");
        await expect(validity).toHaveAttribute("required");
        await expect(validity).toHaveAttribute("type", "number");
        await expect(validity).toHaveAttribute("min", "0");
        await expect(validity).toHaveValue("0");

        const reminder = dialog.getByLabel("AUP reminders (in days)");
        await expect(reminder).toBeHidden();
        const createBtn = dialog.getByRole("button", { name: "Create AUP" });
        await expect(createBtn).toBeEnabled();
        await createBtn.click();
        await dismissToast(page, "AUP Created", "success");
      });

      await testAdmin.step("AUP is has been edited today", async () => {
        await page.goto("./aup");
        const url = page
          .getByLabel("Acceptable Usage Policy URL")
          .filter({ visible: true });
        await expect(url).toHaveValue("http://example.org");
        const created = page.getByLabel("Created");
        await expect(created).toHaveValue("today");
        const lastUpdate = page.getByLabel("Last updated");
        await expect(lastUpdate).toHaveValue("today");
        const validity = page
          .getByLabel("Signature Validity (in days)")
          .filter({ visible: true });
        await expect(validity).toHaveValue("0");
        const reminders = page.getByLabel("AUP Reminders (in days)");
        await expect(reminders).toBeEmpty();
      });

      await testAdmin.step("Edit AUP URL", async () => {
        const dialog = await openEditModal(page);
        const url = dialog.getByLabel("Acceptable Usage Policy URL");
        await expect(url).toHaveValue("http://example.org");
        await url.fill("http://aup.example.org");
        const confirmBtn = dialog.getByRole("button", { name: "Confirm" });
        await expect(confirmBtn).toBeEnabled();
        await confirmBtn.click();
        await dismissToast(page, "AUP updated", "success");
        const url2 = page
          .getByLabel("Acceptable Usage Policy URL")
          .filter({ visible: true });
        await expect(url2).toHaveValue("http://aup.example.org");
      });

      await testAdmin.step("Edit AUP expiration days", async () => {
        const dialog = await openEditModal(page);
        const days = dialog
          .getByLabel("AUP signature validity (in days)")
          .filter({ visible: true });
        await expect(days).toHaveValue("0");
        const reminders = dialog.getByLabel("AUP reminders (in days)");
        await expect(reminders).toBeHidden();
        await days.fill("365");
        await expect(reminders).toBeVisible();
        await reminders.fill("30,15,1");
        const confirmBtn = dialog.getByRole("button", { name: "Confirm" });
        await expect(confirmBtn).toBeEnabled();
        await confirmBtn.click();
        await dismissToast(page, "AUP updated", "success");
        const validity = page
          .getByLabel("Signature Validity (in days")
          .filter({ visible: true });
        await expect(validity).toHaveValue("365");
      });

      await testAdmin.step("Edit AUP reminder in days", async () => {
        const dialog = await openEditModal(page);
        const days = dialog.getByLabel("AUP signature validity (in days)");
        await expect(days).toHaveValue("365");
        const reminders = dialog.getByLabel("AUP reminders (in days)");
        await expect(reminders).toBeVisible();
        await reminders.fill("30,15,1");
        const confirmBtn = dialog.getByRole("button", { name: "Confirm" });
        await expect(confirmBtn).toBeEnabled();
        await confirmBtn.click();
        await dismissToast(page, "AUP updated", "success");
      });

      const valuesAndErrors = [
        [
          "AUP reminder is too large",
          "2048",
          'Cannot update AUPError 400 {"error":"Invalid AUP: aupRemindersInDays must be smaller than signatureValidityInDays"}',
        ],
        [
          "AUP reminder is negative",
          "-42",
          'Cannot update AUPError 400 {"error":"Invalid AUP: zero or negative values for reminders are not allowed"}',
        ],
        [
          "AUP reminder is not a list of integers",
          "42,foo",
          'Cannot update AUPError 400 {"error":"Invalid AUP: non-integer value found for aupRemindersInDays"}',
        ],
      ];

      for (const [description, value, error] of valuesAndErrors) {
        await testAdmin.step(description, async () => {
          const dialog = await openEditModal(page);
          const reminders = dialog.getByLabel("AUP reminders (in days)");
          await expect(reminders).toHaveValue("30,15,1");
          await reminders.fill(value);
          const confirmBtn = dialog.getByRole("button", { name: "Confirm" });
          await expect(confirmBtn).toBeEnabled();
          await confirmBtn.click();
          await dismissToast(page, error, "error");
        });
      }
    }
  );
});
