// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { test as baseTest, expect } from "@playwright/test";
export { expect } from "@playwright/test";

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    await page.goto("./");
    await page.locator("#username").fill("admin");
    await page.locator("#password").fill("password");
    await page.locator("#login-submit").click();

    // Check if client has to be authorized
    await page.waitForLoadState("networkidle");
    const authorizeButton = page.getByRole("button", { name: "Authorize" });
    if (await authorizeButton.isVisible()) {
      await authorizeButton.click();
    }

    // Redirect to new dashboard
    await page.waitForURL("./users/me");
    const dismissButton = page.getByText("I understand");
    if (await dismissButton.isVisible()) {
      dismissButton.click();
      await page.waitForTimeout(500);
    }

    // const cookiesBanner = page.getByTestId("cookies-banner");
    // await expect(cookiesBanner).toBeVisible();
    // const dismissButton = page.locator("#accept-cookies-button");
    // if (await dismissButton.isVisible()) {
    //   dismissButton.click();
    // }

    expect(await page.getByLabel("First Name").inputValue()).toBe("Admin");
    expect(await page.getByLabel("Last Name").inputValue()).toBe("User");
    expect(await page.getByLabel("Email").inputValue()).toBe(
      "1_admin@iam.test"
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);
  },
});
