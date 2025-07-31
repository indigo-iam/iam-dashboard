import { test, expect } from "./auth.fixture";

test("Create and delete Group", async ({ page }) => {
  await test.step("add group", async () => {
    await page.goto("/ui");
    await page.getByRole("switch").click();
    await page.waitForLoadState("networkidle");
    await page.goto("/ui/groups");
    await page.getByTestId("add-group").click();
    const modal = page.getByTestId("modal");
    await modal.locator("input[type=text]").fill("test-bot-group-1");
    await modal.locator("button[type=submit]").click();
    await page.goto("/ui/groups");
    await page
      .getByTestId("search-group")
      .pressSequentially("test-bot-group-1");
    await expect(page.getByTestId("option")).toHaveCount(1);
  });

  await test.step("delete group", async () => {
    await page.goto("/ui/groups");
  });
});
