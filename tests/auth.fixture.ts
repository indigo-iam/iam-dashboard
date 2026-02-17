// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { test as baseTest, expect } from "@playwright/test";
export { expect } from "@playwright/test";

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    test.slow();
    await page.goto("./");
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("password");
    await page.locator("#login-submit").click();

    // Check if client has to be authorized
    const title = "Approval Required for iam-dashboard";
    await expect(page.getByText(title)).toBeVisible();
    await page.getByLabel("prompt me again next time").check();
    const authorizeButton = page.getByRole("button", { name: "Authorize" });
    await authorizeButton.click();

    // Redirect to new dashboard
    await page.waitForURL("./users/me");
    const cookiesBanner = page.getByTestId("accept-cookies-banner");
    await expect(cookiesBanner).toBeVisible();
    await cookiesBanner.getByRole("button").click();
    await expect(page.getByTestId("accept-cookies-banner")).toBeHidden();

    await expect(page.getByLabel("First Name")).toHaveValue("Admin");
    await expect(page.getByLabel("Last Name")).toHaveValue("User");
    await expect(page.getByLabel("Email")).toHaveValue("1_admin@iam.test");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);

    // Logout
    if (await page.getByTestId("signout-btn").isHidden()) {
      await page.getByTestId("menu-btn").click();
      await page.getByTestId("sidebar").waitFor({ state: "visible" });
    }
    await page.getByTestId("signout-btn").click();
  },
});
