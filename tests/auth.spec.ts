import { test, expect } from "./auth.fixture";

test("Login w/IAM", async ({ page }) => {
  await test.step("login", async () => {
    await page.goto("/new-dashboard");
    expect(await page.getByLabel("Username").inputValue()).toBe("admin");
  });

  await test.step("logout", async () => {
    await page.goto("/new-dashboard/signout");
    await page.waitForURL("/login?logout");
  });
});
