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
      const { IAM_ADMIN_USER, IAM_ADMIN_PASSWORD, IAM_ADMIN_UUID } =
        process.env;
      if (!IAM_ADMIN_USER || !IAM_ADMIN_PASSWORD || !IAM_ADMIN_UUID) {
        console.log(process.env);
        throw new TypeError("Incorrect IAM login credentials");
      }

      // Perform authentication steps. Replace these actions with your own.
      await page.goto("/");
      await page.locator("#username").fill(IAM_ADMIN_USER);
      await page.locator("#password").fill(IAM_ADMIN_PASSWORD);
      await page.locator("#login-submit").click();
      await page.waitForURL("/");
      await expect(page.getByTestId("user-id")).toHaveText(IAM_ADMIN_UUID);

      // End of authentication steps.
      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
});
