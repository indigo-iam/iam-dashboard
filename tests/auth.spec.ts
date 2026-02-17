import { test, expect } from "./auth.fixture";

test("Login w/IAM", async ({ page }) => {
  await test.step("login", async () => {
    await page.goto("./");
    expect(await page.getByLabel("Username").inputValue()).toBe("admin");
  });
});
