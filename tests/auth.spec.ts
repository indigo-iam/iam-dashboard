import { test, expect } from "./auth.fixture";

test("Login w/IAM", async ({ page }) => {
  await test.step("login", async () => {
    await page.goto("./");
    await expect(page.getByLabel("Username")).toHaveValue("admin");
  });
});
