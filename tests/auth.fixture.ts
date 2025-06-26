// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

// https://playwright.dev/docs/auth

import { test as baseTest, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

export * from "@playwright/test";

export const test = baseTest.extend<{}, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [
    async ({ browser }, use) => {
      // Use parallelIndex as a unique identifier for each worker.
      const id = test.info().parallelIndex;
      const fileName = path.resolve(
        test.info().project.outputDir,
        `.auth/${id}.json`
      );

      if (fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        await use(fileName);
        return;
      }

      // Important: make sure we authenticate in a clean environment by unsetting storage state.
      const page = await browser.newPage({
        storageState: undefined,
        baseURL: test.info().project.use.baseURL,
      });

      // Perform authentication steps. Replace these actions with your own.
      await page.goto("/new-dashboard");
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
      await page.waitForURL("/new-dashboard");
      expect(await page.getByLabel("First Name").inputValue()).toBe("Admin");
      expect(await page.getByLabel("Last Name").inputValue()).toBe("User");
      expect(await page.getByLabel("Email").inputValue()).toBe(
        "1_admin@iam.test"
      );

      // End of authentication steps.
      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
});
