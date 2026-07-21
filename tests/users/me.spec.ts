// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  expect,
  test,
  TEST_USER,
  ADMIN_USER,
  login,
  logout,
} from "../auth/fixture";
import { dismissToast } from "../utils";

for (const user of [TEST_USER, ADMIN_USER]) {
  test.describe(`'${user.user}' can edit its own profile`, () => {
    test.afterEach("tear down", async ({ page }) => {
      await test.step("reset user info", async () => {
        const saveButton = page.getByRole("button", { name: "Save changes" });
        await expect(saveButton).toBeEnabled();
        const firstName = page.getByLabel("First Name");
        const lastName = page.getByLabel("Last Name");
        const email = page.getByLabel("Email");
        await firstName.fill(user.firstName);
        await lastName.fill(user.lastName);
        await email.fill(user.email);
        await saveButton.click();
        await dismissToast(page, "Edits saved", "success");
        await expect(firstName).toHaveValue(user.firstName);
        await expect(lastName).toHaveValue(user.lastName);
        await expect(email).toHaveValue(user.email);
      });
      await test.step("signout", async () => {
        await logout(page);
      });
    });

    test("edit profile", async ({ page }) => {
      const saveButton = page.getByRole("button", { name: "Save changes" });

      await test.step("login", async () => {
        await login(page, user);
        const saveButton = page.getByRole("button", { name: "Save changes" });
        await expect(saveButton).toBeEnabled();
      });

      await test.step(`'${user.user}' can edit 'First Name' with a valid name`, async () => {
        await expect(saveButton).toBeEnabled();
        const firstName = page.getByLabel("First Name");
        await expect(firstName).toHaveAttribute("required");
        await expect(firstName).toHaveValue(user.firstName);
        await firstName.fill("Albert");
        await saveButton.click();
        await dismissToast(page, "Edits saved", "success");
        await expect(firstName).toHaveValue("Albert");
      });

      await test.step(`'${user.user}' cannot edit 'First Name' with empty string`, async () => {
        await expect(saveButton).toBeEnabled();
        const firstName = page.getByLabel("First Name");
        await firstName.fill("");
        await saveButton.click();
        await expect(firstName).toHaveValue("");
        await page.goto("./users/me", { waitUntil: "networkidle" });
        await expect(saveButton).toBeEnabled();
        await expect(firstName).toHaveValue("Albert");
      });

      await test.step(`'${user.user}' can edit 'Last Name' with a valid name`, async () => {
        await expect(saveButton).toBeEnabled();
        const lastName = page.getByLabel("Last Name");
        await expect(lastName).toHaveAttribute("required");
        await expect(lastName).toHaveValue(user.lastName);
        await lastName.clear();
        await lastName.fill("Einstein");
        await saveButton.click();
        await dismissToast(page, "Edits saved", "success");
        await expect(lastName).toHaveValue("Einstein");
      });

      await test.step(`'${user.user}' cannot edit 'Last Name' with empty string`, async () => {
        await expect(saveButton).toBeEnabled();
        const lastName = page.getByLabel("Last Name");
        await lastName.fill("");
        await saveButton.click();
        await page.goto("./users/me");
        await expect(saveButton).toBeEnabled();
        await expect(lastName).toHaveValue("Einstein");
      });

      await test.step(`'${user.user}' can edit 'Email' with a valid email`, async () => {
        await expect(saveButton).toBeEnabled();
        const email = page.getByLabel("Email");
        await expect(email).toHaveAttribute("type", "email");
        await expect(email).toHaveAttribute("required");
        await email.fill("albert.einstein@science.org");
        await saveButton.click();
        await dismissToast(page, "Edits saved", "success");
        await expect(email).toHaveValue("albert.einstein@science.org");
      });

      await test.step(`'${user.user}' cannot edit 'Email' with an empty string`, async () => {
        await expect(saveButton).toBeEnabled();
        const email = page.getByLabel("Email");
        await email.fill("");
        await saveButton.click();
        await page.goto("./users/me");
        await expect(saveButton).toBeEnabled();
        await expect(email).toHaveValue("albert.einstein@science.org");
      });

      await test.step(`'${user.user}' cannot edit 'Email' with an invalid email`, async () => {
        await expect(saveButton).toBeEnabled();
        const email = page.getByLabel("Email");
        await email.fill("albert.einstein#science.org");
        await saveButton.click();
        await page.goto("./users/me");
        await expect(saveButton).toBeEnabled();
        await expect(email).toHaveValue("albert.einstein@science.org");
      });

      await test.step(`'${user.user}' can reset profile form`, async () => {
        await expect(saveButton).toBeEnabled();
        const firstName = page.getByLabel("First Name");
        const lastName = page.getByLabel("Last Name");
        const email = page.getByLabel("Email");
        await firstName.fill("Enrico");
        await lastName.fill("Fermi");
        await email.fill("enrico.fermi@science.org");
        const cancel = page.getByRole("button", { name: "Cancel" });
        await expect(cancel).toBeEnabled();
        await cancel.click();
        await expect(firstName).toHaveValue("Albert");
        await expect(lastName).toHaveValue("Einstein");
        await expect(email).toHaveValue("albert.einstein@science.org");
      });
    });
  });
}
