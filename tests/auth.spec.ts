import { test, expect, IAM_DASHBOARD_URL } from "./auth.fixture";

test("Login w/IAM", async ({ page }) => {
  await test.step("login", async () => {
    await page.goto(IAM_DASHBOARD_URL);
    expect(await page.getByLabel("Username").inputValue()).toBe("admin");
  });

  await test.step("logout", async () => {
    await page.getByTestId("signout-button").click();
    await page.waitForURL("/login");
  });
});
