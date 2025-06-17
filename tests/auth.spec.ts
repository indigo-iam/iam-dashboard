import { test, expect } from "./auth.fixture";

test("Login w/IAM", async ({ page }) => {
  const { IAM_ADMIN_USER, IAM_ADMIN_PASSWORD, IAM_ADMIN_UUID } = process.env;
  if (!IAM_ADMIN_USER || !IAM_ADMIN_PASSWORD || !IAM_ADMIN_UUID) {
    throw new TypeError("Incorrect IAM login credentials");
  }

  await test.step("login", async () => {
    await page.goto("./signin");
    await expect(page.getByTestId("user-id")).toHaveText(IAM_ADMIN_UUID);
  });

  await test.step("logout", async () => {
    await page.goto("/signout");
    await page.waitForURL("https://iam-dev.cloud.cnaf.infn.it/login?logout");
  });
});
