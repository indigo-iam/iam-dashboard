// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  testAdmin,
  expect,
  enableAdminMode,
  testUser,
  TEST_USER,
} from "./auth.fixture";
import { changeTabPanel, dismissToast } from "./utils";

testUser.afterEach("reset user info", async ({ signedUpPage }) => {
  const page = signedUpPage;
  const saveButton = page.getByRole("button", { name: "Save changes" });

  const firstName = page.getByLabel("First Name");
  const lastName = page.getByLabel("Last Name");
  const email = page.getByLabel("Email");
  await firstName.fill(TEST_USER.firstName);
  await lastName.fill(TEST_USER.lastName);
  await email.fill(TEST_USER.email);
  await saveButton.click();

  await dismissToast(page, "success");
  await page.reload();

  await expect(page.getByLabel("First Name")).toHaveValue("Test");
  await expect(page.getByLabel("Last Name")).toHaveValue("User");
});

testUser("user can edit its own profile", async ({ signedUpPage }) => {
  const page = signedUpPage;

  const tab = page.getByText("GENERAL");
  await changeTabPanel(tab);

  const firstName = page.getByLabel("First Name");
  const lastName = page.getByLabel("Last Name");
  const email = page.getByLabel("Email");

  const saveButton = page.getByRole("button", { name: "Save changes" });

  await testUser.step(
    "user can edit 'First Name' with a valid name",
    async () => {
      await expect(firstName).toHaveAttribute("required");
      await expect(firstName).toHaveValue("Test");
      await firstName.fill("Albert");
      await saveButton.click();
      await dismissToast(page, "success");
      await expect(firstName).toHaveValue("Albert");
    }
  );

  await testUser.step(
    "user cannot edit 'First Name' with empty string",
    async () => {
      await firstName.fill("");
      await saveButton.click();
      await page.reload();
      await expect(firstName).toHaveValue("Albert");
    }
  );

  await testUser.step(
    "user can edit 'Last Name' with a valid name",
    async () => {
      await expect(lastName).toHaveAttribute("required");
      await expect(lastName).toHaveValue("User");
      await lastName.fill("Einstein");
      await saveButton.click();
      await dismissToast(page, "success");
      await expect(lastName).toHaveValue("Einstein");
    }
  );

  await testUser.step(
    "user cannot edit 'Last Name' with empty string",
    async () => {
      await lastName.fill("");
      await page.reload();
      await saveButton.click();
      await expect(lastName).toHaveValue("Einstein");
    }
  );

  await testUser.step("user can edit 'Email' with a valid email", async () => {
    await expect(email).toHaveAttribute("type", "email");
    await expect(email).toHaveAttribute("required");
    await email.fill("albert.einstein@science.org");
    await saveButton.click();
    await dismissToast(page, "success");
    await expect(email).toHaveValue("albert.einstein@science.org");
  });

  await testUser.step(
    "user cannot edit 'Email' with an empty string",
    async () => {
      await email.fill("");
      await saveButton.click();
      await page.reload();
      await expect(email).toHaveValue("albert.einstein@science.org");
    }
  );

  await testUser.step(
    "user cannot edit 'Email' with an invalid email",
    async () => {
      await email.fill("albert.einstein#science.org");
      await saveButton.click();
      await page.reload();
      await expect(email).toHaveValue("albert.einstein@science.org");
    }
  );

  await testUser.step("user can reset profile form", async () => {
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
