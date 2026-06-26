// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { test as baseTest, expect, Page } from "@playwright/test";
export { expect } from "@playwright/test";

export type UserInfo = {
  user: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const ADMIN_USER: UserInfo = {
  user: "admin",
  password: "password",
  firstName: "Admin",
  lastName: "User",
  email: "1_admin@iam.test",
};

export const TEST_USER: UserInfo = {
  user: "test",
  password: "password",
  firstName: "Test",
  lastName: "User",
  email: "test@iam.test",
};

async function openUserMenu(page: Page) {
  const userMenuButton = page.getByTitle("Open user menu");
  const userMenu = page.getByTestId("user-menu");
  await expect(async () => {
    await expect(userMenuButton).toBeEnabled();
    await userMenuButton.click();
    await expect(userMenu).toBeVisible();
  }).toPass();
  return userMenu;
}

export async function login(page: Page, userInfo: UserInfo) {
  const { user, password, firstName, lastName, email } = userInfo;
  await page.goto("./");
  await page.locator("#username").fill(user);
  await page.locator("#password").fill(password);
  await page.locator("#login-submit").click();
  await checkClientAuthorization(page);
  await page.waitForURL("./users/me");
  await expect(page.getByLabel("First Name")).toHaveValue(firstName);
  await expect(page.getByLabel("Last Name")).toHaveValue(lastName);
  await expect(page.getByLabel("Email")).toHaveValue(email);
}

export async function logout(page: Page) {
  const userMenu = await openUserMenu(page);
  const signOutButton = userMenu.getByRole("button", { name: "Sign out" });
  await expect(signOutButton).toBeVisible();
  await signOutButton.click();
  // without dot = https://iam.test.example/login, with dot= /dev/login
  await page.waitForURL("/login");
}

export type TestOptions = {
  signedUpPage: Page;
  user: UserInfo;
};

export const test = baseTest.extend<TestOptions>({
  user: [TEST_USER, { option: true }], // fallback value
  signedUpPage: async ({ page, user }, use) => {
    await login(page, user);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);
    await logout(page);
  },
});

export const testAdmin = baseTest.extend<TestOptions>({
  signedUpPage: async ({ page }, use) => {
    await login(page, ADMIN_USER);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);
    await logout(page);
  },
});

export const testUser = baseTest.extend<{ signedUpPage: Page }>({
  signedUpPage: async ({ page }, use) => {
    await login(page, TEST_USER);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);
    await logout(page);
  },
});

async function checkClientAuthorization(page: Page) {
  const title = "Approval Required for The INDIGO IAM dashboard";
  await expect(page.getByText(title)).toBeVisible();
  await page.getByLabel("prompt me again next time").check();
  const authorizeButton = page.getByRole("button", { name: "Authorize" });
  await authorizeButton.click();
}

async function setMode(page: Page, mode: "Admin mode" | "User mode") {
  const userMenu = await openUserMenu(page);
  await userMenu.getByRole("button", { name: mode }).click();
  await expect(page.locator("#loading")).toBeVisible();
  await expect(page.locator("#loading")).toBeHidden();
  await expect(userMenu).toBeHidden();
}

export async function enableAdminMode(page: Page) {
  await setMode(page, "Admin mode");
  await expect(page.getByTestId("admin-mode-label")).toBeVisible();
}

export async function disableAdminMode(page: Page) {
  await setMode(page, "User mode");
  await expect(page.getByTestId("admin-mode-label")).toBeHidden();
}
