// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { expect, test, TEST_USER, ADMIN_USER } from "../auth/fixture";
import { changeTabPanel, dismissToast } from "../utils";

// Since multiple browsers can write user information at the same time for the
// same user, run this tests serially to avoid race conditions.
test.describe.configure({ mode: "serial" });

for (const user of [TEST_USER, ADMIN_USER]) {
  test.describe(`Testing user profile with user '${user.user}'`, () => {
    test.use({ user });

    test.afterEach("reset user info", async ({ signedUpPage, user }) => {
      const page = signedUpPage;
      const saveButton = page.getByRole("button", { name: "Save changes" });

      const firstName = page.getByLabel("First Name");
      const lastName = page.getByLabel("Last Name");
      const email = page.getByLabel("Email");
      await firstName.fill(user.firstName);
      await lastName.fill(user.lastName);
      await email.fill(user.email);
      await saveButton.click();
      await page.waitForLoadState();

      await dismissToast(page, "success");

      await expect(firstName).toHaveValue(user.firstName);
      await expect(lastName).toHaveValue(user.lastName);
      await expect(email).toHaveValue(user.email);
    });

    test(`'${user.user}' can edit its own profile`, async ({
      signedUpPage,
    }) => {
      const page = signedUpPage;

      const tab = page.getByText("GENERAL");
      await changeTabPanel(tab);

      const saveButton = page.getByRole("button", { name: "Save changes" });

      await test.step(`'${user.user}' can edit 'First Name' with a valid name`, async () => {
        const firstName = page.getByLabel("First Name");
        await expect(firstName).toHaveAttribute("required");
        await expect(firstName).toHaveValue(user.firstName);
        await firstName.clear();
        await firstName.fill("Albert");
        await saveButton.click();
        await page.waitForLoadState();
        await dismissToast(page, "success");
        await expect(firstName).toHaveValue("Albert");
      });

      await test.step(`'${user.user}' cannot edit 'First Name' with empty string`, async () => {
        let firstName = page.getByLabel("First Name");
        await firstName.clear();
        await firstName.fill("");
        await saveButton.click();
        await page.waitForLoadState();
        await expect(firstName).toHaveValue("");
        await page.goto("./users/me");
        firstName = page.getByLabel("First Name");
        await expect(firstName).toHaveValue("Albert");
      });

      await test.step(`'${user.user}' can edit 'Last Name' with a valid name`, async () => {
        const lastName = page.getByLabel("Last Name");
        await expect(lastName).toHaveAttribute("required");
        await expect(lastName).toHaveValue(user.lastName);
        await lastName.clear();
        await lastName.fill("Einstein");
        await saveButton.click();
        await page.waitForLoadState();
        await dismissToast(page, "success");
        await expect(lastName).toHaveValue("Einstein");
      });

      await test.step(`'${user.user}' cannot edit 'Last Name' with empty string`, async () => {
        const lastName = page.getByLabel("Last Name");
        await lastName.clear();
        await lastName.fill("");
        await page.reload();
        await saveButton.click();
        await page.waitForLoadState();
        await page.goto("./users/me");
        await expect(lastName).toHaveValue("Einstein");
      });

      await test.step(`'${user.user}' can edit 'Email' with a valid email`, async () => {
        const email = page.getByLabel("Email");
        await expect(email).toHaveAttribute("type", "email");
        await expect(email).toHaveAttribute("required");
        await email.clear();
        await email.fill("albert.einstein@science.org");
        await saveButton.click();
        await page.waitForLoadState();
        await dismissToast(page, "success");
        await expect(email).toHaveValue("albert.einstein@science.org");
      });

      await test.step(`'${user.user}' cannot edit 'Email' with an empty string`, async () => {
        let email = page.getByLabel("Email");
        await email.clear();
        await email.fill("");
        await saveButton.click();
        await page.goto("./users/me");
        email = page.getByLabel("Email");
        await expect(email).toHaveValue("albert.einstein@science.org");
      });

      await test.step(`'${user.user}' cannot edit 'Email' with an invalid email`, async () => {
        let email = page.getByLabel("Email");
        await email.clear();
        await email.fill("albert.einstein#science.org");
        await saveButton.click();
        await page.waitForLoadState();
        await page.goto("./users/me");
        email = page.getByLabel("Email");
        await expect(email).toHaveValue("albert.einstein@science.org");
      });

      await test.step(`'${user.user}' can reset profile form`, async () => {
        const firstName = page.getByLabel("First Name");
        const lastName = page.getByLabel("Last Name");
        const email = page.getByLabel("Email");
        await firstName.clear();
        await lastName.clear();
        await email.clear();
        await firstName.fill("Enrico");
        await lastName.fill("Fermi");
        await email.fill("enrico.fermi@science.org");
        const cancel = page.getByRole("button", { name: "Cancel" });
        await cancel.click();
        await expect(firstName).toHaveValue("Albert");
        await expect(lastName).toHaveValue("Einstein");
        await expect(email).toHaveValue("albert.einstein@science.org");
      });
    });
  });
}
