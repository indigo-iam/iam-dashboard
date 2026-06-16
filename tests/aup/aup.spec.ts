// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { testAdmin, testUser, enableAdminMode, expect } from "../auth/fixture";
import { Page } from "@playwright/test";
import { dismissToast } from "../utils";

async function openEditModal(page: Page) {
  const dialog = page.getByRole("dialog").filter({ visible: true });
  await expect(async () => {
    const editBtn = page.getByRole("button", { name: "Edit AUP" });
    await editBtn.click();
    await expect(dialog).toBeVisible();
    const heading = dialog.getByRole("heading");
    await expect(heading).toHaveText("Edit AUP for this organization");
  }).toPass();
  return dialog;
}

testUser("User cannot see AUP page", async ({ signedUpPage }) => {
  const page = signedUpPage;
  await page.goto("./aup");
  await page.waitForURL("./users/me");
});

testAdmin(
  "Admin cannot see AUP page in non-admin mode",
  async ({ signedUpPage }) => {
    const page = signedUpPage;
    await page.goto("./aup");
    await page.waitForURL("./users/me");
  }
);

testAdmin.describe("Admin can create/edit/delete the AUP", () => {
  testAdmin.afterEach("Delete AUP", async ({ signedUpPage }) => {
    const page = signedUpPage;

    const deleteBtn = page.getByRole("button", { name: "Delete AUP" });
    const dialog = page.getByRole("dialog").filter({ visible: true });

    await expect(async () => {
      await expect(deleteBtn).toBeVisible();
      await deleteBtn.click();
      const heading = dialog.getByRole("heading");
      await expect(heading).toHaveText(
        "Delete the Acceptable Usage Policy for this organization?"
      );
    }).toPass();

    const confirmBtn = dialog.getByRole("button", { name: "Delete" });
    await expect(confirmBtn).toBeVisible();
    await confirmBtn.click();
    await dismissToast(page, "AUP deleted", "success");
    await expect(
      page.getByText("AUP is not defined for this organization.")
    ).toBeVisible();
  });

  testAdmin(
    "Admin can create and edit a not-expiring AUP",
    async ({ signedUpPage }) => {
      const page = signedUpPage;

      await testAdmin.step("enabled admin mode", async () => {
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

      await testAdmin.step("create AUP", async () => {
        const createAupBtn = page.getByRole("button", { name: "Create AUP" });
        const dialog = page.getByRole("dialog").filter({
          hasText: "Create the Acceptable Usage Policy for this organization",
        });
        await expect(async () => {
          await createAupBtn.click();
          await expect(dialog).toBeVisible();
        }).toPass();

        await expect(
          dialog.getByRole("button", { name: "Create AUP" })
        ).toBeDisabled();

        const url = dialog.getByLabel("Acceptable Usage Policy URL");
        await expect(url).toHaveAttribute("required");

        await expect(url).toHaveAttribute("type", "url");
        await url.pressSequentially("http://example.org");

        const validity = dialog.getByLabel("AUP signature validity (in days)");
        await expect(validity).toHaveAttribute("required");
        await expect(validity).toHaveAttribute("type", "number");
        await expect(validity).toHaveAttribute("min", "0");
        await expect(validity).toHaveValue("0");

        const reminder = dialog.getByLabel("AUP reminders (in days)");
        await expect(reminder).toBeHidden();
        await dialog.getByRole("button", { name: "Create AUP" }).click();
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
        await expect(async () => {
          const url = dialog.getByLabel("Acceptable Usage Policy URL");
          await expect(url).toHaveValue("http://example.org");
          await url.clear();
          await url.pressSequentially("http://aup.example.org");
          const confirmBtn = dialog.getByRole("button", { name: "Confirm" });
          await confirmBtn.click();
          await dismissToast(page, "AUP updated", "success");
        }).toPass();
        const url = page
          .getByLabel("Acceptable Usage Policy URL")
          .filter({ visible: true });
        await expect(url).toHaveValue("http://aup.example.org");
      });

      await testAdmin.step("Edit AUP expiration days", async () => {
        await expect(async () => {
          const dialog = await openEditModal(page);
          const days = dialog.getByLabel("AUP signature validity (in days)");
          await expect(days).toHaveValue("0");
          const reminders = dialog.getByLabel("AUP reminders (in days)");
          await expect(reminders).toBeHidden();
          await days.clear();
          await days.fill("365");
          await expect(reminders).toBeVisible();
          await reminders.fill("30,15,1");
          await dialog.getByRole("button", { name: "Confirm" }).click();
          await dismissToast(page, "AUP updated", "success");
        }).toPass();
        await expect(async () => {
          const days = page
            .getByLabel("Signature validity (in days)")
            .filter({ visible: true });
          await expect(days).toHaveValue("365");
          const reminders = page
            .getByLabel("AUP reminders (in days)")
            .filter({ visible: true });
          await expect(reminders).toHaveValue("30,15,1");
        }).toPass();
      });
    }
  );
});
