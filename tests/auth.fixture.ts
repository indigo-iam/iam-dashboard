// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { test as baseTest, expect, Page } from "@playwright/test";
export { expect } from "@playwright/test";

async function login(page: Page) {
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
}

async function logout(page: Page) {
  await page.getByTestId("user-menu-btn").click();
  await page.getByTestId("signout-btn").click();
}

export const test = baseTest.extend<{ page: Page }>({
  page: async ({ browser }, use) => {
    const newPage = await browser.newPage();
    await login(newPage);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(newPage);
    await logout(newPage);
  },
});

export async function checkClientAuthorization(page: Page) {
  const title = "Approval Required for iam-dashboard";
  await expect(page.getByText(title)).toBeVisible();
  await page.getByLabel("prompt me again next time").check();
  const authorizeButton = page.getByRole("button", { name: "Authorize" });
  await authorizeButton.click();
}
