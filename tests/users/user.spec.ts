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

    await testUser.step("user sends a request", async () => {
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

    await testUser.step("user must see its own pending request", async () => {
      const item = page
        .getByRole("listitem")
        .filter({ hasText: "Motivation: Test motivation message" });
      await expect(item).toBeVisible();
    });

    await testUser.step("user can revoke its own pending request", async () => {
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
  await page.waitForURL("./users/me");

  await testAdmin.step("enable admin mode", async () => {
    await enableAdminMode(page);
  });

  await testAdmin.step("navigate to test user page", async () => {
    await navigateToTestUserPage(page, "Test User");
  });

  await testAdmin.step("endtime is initially not set", async () => {
    const endtime = page.getByLabel("Endtime date");
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
    await dismissToast(page, "Membership endtime updated", "success");
    await expect(page.getByLabel("Endtime date")).toHaveValue("2999-12-12");
  });

  await testAdmin.step("can revoke endtime", async () => {
    const dialog = await openEditEndtimeModal(page);
    const clear = dialog.getByLabel("Clear");
    await expect(clear).toBeEnabled();
    await clear.click();
    const save = dialog.getByRole("button", { name: "Save" });
    await save.click();
    await expect(dialog).toBeHidden();
    await dismissToast(page, "Membership endtime revoked", "success");
    const endtime = page.getByLabel("Endtime date");
    await expect(endtime).toHaveValue("");
  });
});

interface User {
  firstName: string;
  surname: string;
  username: string;
  email: string;
}

async function createNewUser(page: Page, user: User) {
  await page.goto("./users");

  await page.getByRole("button", { name: "New user" }).click();

  await page.getByRole("textbox", { name: "First Name*" }).fill(user.firstName);
  await page.getByRole("textbox", { name: "Surname*" }).fill(user.surname);
  await page.getByRole("textbox", { name: "Username*" }).fill(user.username);
  await page.getByRole("textbox", { name: "Email*" }).fill(user.email);

  await page.getByRole("button", { name: "Create User" }).click();

  await dismissToast(page, "User created", "success");
}

async function openDeleteUserModal(page: Page, fullName: string) {
  await page.getByRole("button", { name: "Delete user" }).click();

  const dialog = page.getByRole("dialog").filter({ visible: true });

  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading").first()).toHaveText(
    `Delete user '${fullName}'?`,
  );

  return dialog;
}

testAdmin("admin can delete user and it returns to the users page", async ({ signedUpPage }) => {
  const page = signedUpPage;
  await page.waitForURL("./users/me");
  const user = {
    firstName: "Test",
    surname: "Delete",
    username: "test_delete",
    email: "test_delete@example.com",
  };
  const userName = `${user.firstName} ${user.surname}`;

  await testAdmin.step("enable admin mode", async () => {
    await enableAdminMode(page);
  });

  await testAdmin.step("create a new test user", async () => {
    await createNewUser(page, user);
  });

  await testAdmin.step("navigate to test user page", async () => {
    await navigateToTestUserPage(page, userName);
  });

  await testAdmin.step("delete the user", async () => {
    const dialog = await openDeleteUserModal(page, userName);

    const confirmBtn = dialog.getByRole("button", { name: "Confirm" });
    await expect(confirmBtn).toBeEnabled();

    await confirmBtn.click();

    await expect(dialog).toBeHidden();
    await dismissToast(page, "User deleted", "success");
  });

  await testAdmin.step("return to users page", async () => {
    await expect(page).toHaveURL("./users");
  });
});
