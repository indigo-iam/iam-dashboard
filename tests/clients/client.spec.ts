// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Page } from "@playwright/test";
import { testAdmin, expect, enableAdminMode } from "../auth/fixture";
import { dismissToast } from "../utils";

interface Client {
    name: string;
    description: string;
    redirectUri: string;
}

async function createNewClient(page: Page, client: Client) {
    await page.goto("./clients");

    const newClientBtn = page.getByRole("button", { name: "New client" });
    await expect(newClientBtn).toBeEnabled();
    await newClientBtn.click();

    await page.getByRole('textbox', { name: 'Client Name*' }).fill(client.name);
    await page.getByRole('textbox', { name: 'Client Description' }).fill(client.description);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('textbox', { name: 'Redirect URIs*' }).fill(client.redirectUri);
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    await dismissToast(page, "Client created", "success");
}

async function navigateToClientPage(page: Page, clientName: string) {
    await page.goto("./clients");

    const newClientBtn = page.getByRole("button", { name: "New client" });
    await expect(newClientBtn).toBeEnabled(); // wait for page fully loaded

    const searchbar = page.getByPlaceholder("Type to search a client");
    await searchbar.pressSequentially(clientName);
    const testClient = page.getByRole("link").filter({ hasText: clientName });
    const clients = page.locator(".iam-list-item").filter({ visible: true });
    await expect(clients).toHaveCount(1);
    await expect(clients).toBeEnabled();
    await testClient.click();
    const heading = page.getByRole("heading").filter({ hasText: clientName });
    await expect(heading).toBeVisible();
}

async function openDeleteClientModal(page: Page) {
    await page.getByRole("button", { name: "Delete" }).click();

    const dialog = page.getByRole("dialog").filter({ visible: true });

    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading").first()).toHaveText(
        `Delete client?`,
    );

    return dialog;
}

testAdmin("admin can delete client and it returns to the clients page", async ({ signedUpPage }) => {
    const page = signedUpPage;
    await page.waitForURL("./users/me");
    const client = {
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

    await testAdmin.step("navigate to test client page", async () => {
        await navigateToClientPage(page, client.name);
    });

    await testAdmin.step("delete the client", async () => {
        const dialog = await openDeleteClientModal(page);

        const deleteBtn = dialog.getByRole("button", { name: "Delete" });
        await expect(deleteBtn).toBeEnabled();

        await deleteBtn.click();

        await expect(dialog).toBeHidden();
        await dismissToast(page, "Client deleted", "success");
    });

    await testAdmin.step("return to clients page", async () => {
        await expect(page).toHaveURL("./clients");
    });
});
