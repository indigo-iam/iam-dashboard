import { test, expect } from "./auth.fixture";

test("Login w/IAM", async ({ page }) => {
  await test.step("login", async () => {
    await page.goto("/ui");
    expect(await page.getByLabel("Username").inputValue()).toBe("admin");
  });

  await test.step("logout", async () => {
    await page.goto("/ui/signout");
    await page.waitForURL("/login");
  });
});
