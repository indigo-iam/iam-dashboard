// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { test as baseTest, expect, Page } from "@playwright/test";
export { expect } from "@playwright/test";

async function logout(page: Page) {
  await expect(page.getByTestId("user-menu-btn")).toBeVisible();
  await page.getByTestId("user-menu-btn").click();
  const userMenu = page.getByTestId("user-menu");
  await expect(userMenu).toBeVisible();
  const signOutButton = userMenu.getByRole("button", { name: "Sign out" });
  await expect(signOutButton).toBeVisible();
  await signOutButton.click();
  // without dot = https://iam.test.example/login, with dot= /dev/login
  await page.waitForURL("/login");
}

export const testAdmin = baseTest.extend<{ signedUpPage: Page }>({
  signedUpPage: async ({ page }, use) => {
    await page.goto("./");
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("password");
    await page.locator("#login-submit").click();
    await checkClientAuthorization(page);

    // Redirect to new dashboard
    await page.waitForURL("./users/me");
    await expect(page.getByLabel("First Name")).toHaveValue("Admin");
    await expect(page.getByLabel("Last Name")).toHaveValue("User");
    await expect(page.getByLabel("Email")).toHaveValue("1_admin@iam.test");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);
    await logout(page);
  },
});

export const testUser = baseTest.extend<{ signedUpPage: Page }>({
  signedUpPage: async ({ page }, use) => {
    await page.goto("./");
    await page.locator("#username").fill("test");
    await page.locator("#password").fill("password");
    await page.locator("#login-submit").click();
    await checkClientAuthorization(page);

    // Redirect to new dashboard
    await page.waitForURL("./users/me");
    await expect(page.getByLabel("First Name")).toHaveValue("Test");
    await expect(page.getByLabel("Last Name")).toHaveValue("User");
    await expect(page.getByLabel("Email")).toHaveValue("test@iam.test");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);
    await logout(page);
  },
});

export async function checkClientAuthorization(page: Page) {
  const title = "Approval Required for The INDIGO IAM dashboard";
  await expect(page.getByText(title)).toBeVisible();
  await page.getByLabel("prompt me again next time").check();
  const authorizeButton = page.getByRole("button", { name: "Authorize" });
  await authorizeButton.click();
}

export async function enableAdminMode(page: Page) {
  await expect(page.getByTestId("user-menu-btn")).toBeVisible();
  await page.getByTestId("user-menu-btn").click();
  const userMenu = page.getByTestId("user-menu");
  await expect(userMenu).toBeVisible({timeout: 10000});
  await userMenu.getByRole("button", { name: "Admin mode" }).click();
  await expect(page.locator("#loading")).toBeVisible();
  await expect(page.locator("#loading")).toBeHidden();
  await page.waitForLoadState("networkidle");
  await expect(page.getByTestId("admin-mode-label")).toBeVisible();
}

export async function disableAdminMode(page: Page) {
  await expect(page.getByTestId("user-menu-btn")).toBeVisible();
  await page.getByTestId("user-menu-btn").click();
  const userMenu = page.getByTestId("user-menu");
  await expect(userMenu).toBeVisible();
  await userMenu.getByRole("button", { name: "User mode" }).click();
  await expect(page.locator("#loading")).toBeVisible();
  await expect(page.locator("#loading")).toBeHidden();
  await page.waitForLoadState("networkidle");
  // await page.reload();
  await expect(page.getByTestId("admin-mode-label")).toBeHidden();
}
