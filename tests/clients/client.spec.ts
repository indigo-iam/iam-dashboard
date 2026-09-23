// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Page } from "@playwright/test";
import { testAdmin, expect, enableAdminMode, testUser } from "../auth/fixture";
import { changeTabPanel, dismissToast } from "../utils";

type Client = {
  name: string;
  description: string;
  redirectUri: string;
};

async function createNewClient(page: Page, client: Client) {
  await page.goto("./clients");
  const newClientBtn = page.getByRole("button", { name: "New client" });
  await expect(newClientBtn).toBeEnabled();
  await newClientBtn.click();
  await page.waitForURL("./clients/new");
  const clientName = page.getByTitle("Client Name");
  await clientName.fill(client.name);
  const clientDescription = page.getByLabel("Client Description");
  await clientDescription.fill(client.description);
  await page.getByRole("button", { name: "Continue" }).click();
  const redirectUri = page.getByLabel("Redirect URIs");
  await redirectUri.fill(client.redirectUri);
  await page.getByRole("button", { name: "Add", exact: true }).click();
}

async function saveNewClient(page: Page) {
  const continueBtn = page.getByRole("button", { name: "Continue" });
  await continueBtn.click();
  await page.getByRole("button", { name: "Save" }).click();
  await dismissToast(page, "Client created", "success");
  await continueBtn.click();
}

async function deleteClient(page: Page) {
  const general = page.getByRole("tab", { name: "GENERAL" });
  await general.scrollIntoViewIfNeeded();
  await expect(general).toBeVisible();
  await expect(general).toBeEnabled();
  await changeTabPanel(general);
  const dialog = await openDeleteClientModal(page);
  const deleteBtn = dialog.getByRole("button", { name: "Delete" });
  await expect(deleteBtn).toBeEnabled();
  await deleteBtn.click();
  await expect(dialog).toBeHidden();
  await dismissToast(page, "Client deleted", "success");
}

async function navigateToClientPage(page: Page, clientName: string) {
  await page.goto("./clients");
  const newClientBtn = page.getByRole("button", { name: "New client" });
  await expect(newClientBtn).toBeEnabled(); // wait for page fully loaded
  const searchbar = page
    .getByPlaceholder("Type to search a client")
    .filter({ visible: true });
  await searchbar.pressSequentially(clientName);
  await page.waitForURL("./clients?*");
  const testClient = page.getByRole("link").filter({ hasText: clientName });
  const clients = page.locator(".iam-list-item").filter({ visible: true });
  await expect(clients).toHaveCount(1);
  await expect(clients).toBeEnabled();
  await testClient.click();
  await page.waitForURL("./clients/*");
  const heading = page.getByRole("heading").filter({ hasText: clientName });
  await expect(heading).toBeVisible();
}

async function navigateToScopeTab(page: Page) {
  const scopes = page.getByRole("tab", { name: "SCOPES" });
  await scopes.scrollIntoViewIfNeeded();
  await expect(scopes).toBeEnabled();
  await changeTabPanel(scopes);
}

async function openDeleteClientModal(page: Page) {
  await page.getByRole("button", { name: "Delete" }).click();
  const dialog = page.getByRole("dialog").filter({ visible: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading").first()).toHaveText(
    `Delete client?`
  );
  return dialog;
}

async function openSystemScopeModal(page: Page) {
  const addSystemScopes = page.getByRole("button", {
    name: "Add system scope(s)",
  });
  await expect(addSystemScopes).toBeVisible();
  await expect(addSystemScopes).toBeEnabled();
  await addSystemScopes.click();
  const dialog = page.getByRole("dialog").filter({ visible: true });
  await expect(dialog).toBeVisible();
  const heading = dialog.getByRole("heading");
  await expect(heading).toHaveText("Add system scopes");
  return dialog;
}

testAdmin(
  "admin can crete/edit/delete their client",
  async ({ signedUpPage }) => {
    const page = signedUpPage;
    await page.waitForURL("./users/me");

    const client: Client = {
      name: "Test1",
      description: "To be deleted",
      redirectUri: "https://www.abc.com",
    };

    await testAdmin.step("enable admin mode", async () => {
      await enableAdminMode(page);
    });

    await testAdmin.step("create a new test client", async () => {
      await createNewClient(page, client);
    });

    await testAdmin.step(
      "admin can add restricted scope during creation",
      async () => {
        const addScopes = page.getByLabel("Scopes");
        await expect(addScopes).toBeEnabled();
        await addScopes.click();
        const scopesList = page.getByRole("listbox").filter({ visible: true });
        const adminRead = scopesList.getByText("iam:admin.read");
        await adminRead.scrollIntoViewIfNeeded();
        await expect(adminRead).toBeVisible();
        await adminRead.click();
        await page.keyboard.press("Escape"); // dismiss the selection list
      }
    );

    await testAdmin.step("save new client", async () => {
      await saveNewClient(page);
    });

    await testAdmin.step("return to clients page", async () => {
      await expect(page).toHaveURL("./clients");
    });

    await testAdmin.step("navigate to test client page", async () => {
      await navigateToClientPage(page, client.name);
    });

    await testAdmin.step("admin can add a restricted scope", async () => {
      await navigateToScopeTab(page);
      const dialog = await openSystemScopeModal(page);

      // scope already added during creation
      let scopeAdminRead = dialog.getByLabel("iam:admin.read");
      await expect(scopeAdminRead).toBeHidden();

      let scopeAdminWrite = dialog.getByLabel("iam:admin.write");
      await scopeAdminWrite.scrollIntoViewIfNeeded();
      await expect(scopeAdminWrite).toBeVisible();
      await expect(scopeAdminWrite).toBeEnabled();
      await scopeAdminWrite.click();
      const addScopes = dialog.getByRole("button", { name: "Add scope(s)" });
      await expect(addScopes).toBeEnabled();
      await addScopes.click();
      await expect(dialog).toBeHidden();
      await dismissToast(page, "Client saved", "success");
      scopeAdminRead = page
        .locator(".iam-list-item")
        .filter({ hasText: "iam:admin.read" });
      await expect(scopeAdminRead).toBeVisible();
      scopeAdminWrite = page
        .locator(".iam-list-item")
        .filter({ hasText: "iam:admin.write" });
      await expect(scopeAdminWrite).toBeVisible();
    });

    await testAdmin.step("delete the client", async () => {
      await deleteClient(page);
    });

    await testAdmin.step("return to clients page", async () => {
      await expect(page).toHaveURL("./clients");
    });
  }
);

testUser(
  "user can crete/edit/delete their client",
  async ({ signedUpPage }) => {
    const page = signedUpPage;
    await page.waitForURL("./users/me");
    const client: Client = {
      name: "Test2",
      description: "To be deleted",
      redirectUri: "https://www.abc.com",
    };

    await testUser.step("create a new test client", async () => {
      await createNewClient(page, client);
    });

    await testUser.step(
      "user cannot add system scopes during creation",
      async () => {
        const addScopes = page.getByLabel("Scopes");
        await expect(addScopes).toBeEnabled();
        await addScopes.click();
        const scopesList = page.getByRole("listbox").filter({ visible: true });
        const adminRead = scopesList.getByText("iam:admin.read");
        const adminWrite = scopesList.getByText("iam:admin.write");
        await expect(adminRead).toBeHidden();
        await expect(adminWrite).toBeHidden();
        await page.keyboard.press("Escape"); // dismiss the selection list
      }
    );

    await testUser.step("save new client", async () => {
      await saveNewClient(page);
    });

    await testUser.step("return to clients page", async () => {
      await expect(page).toHaveURL("./clients");
    });

    await testUser.step("navigate to test client page", async () => {
      await navigateToClientPage(page, client.name);
    });

    await testUser.step("user cannot add a restricted scope", async () => {
      await navigateToScopeTab(page);
      const dialog = await openSystemScopeModal(page);

      const scopeAdminRead = dialog.getByLabel("iam:admin.read");
      await expect(scopeAdminRead).toBeHidden();
      const scopeAdminWrite = dialog.getByLabel("iam:admin.write");
      await expect(scopeAdminWrite).toBeHidden();

      const close = dialog.getByTitle("Close");
      await expect(close).toBeEnabled();
      await close.click();
      await expect(dialog).toBeHidden();
    });

    await testUser.step("delete the client", async () => {
      await deleteClient(page);
    });

    await testUser.step("return to clients page", async () => {
      await expect(page).toHaveURL("./clients");
    });
  }
);
