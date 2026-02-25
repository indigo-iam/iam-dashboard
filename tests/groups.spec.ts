import { test, expect } from "./auth.fixture";
import crypto from "node:crypto";

function sha256(s: string) {
  const hash = crypto.createHash("sha256");
  hash.update(s);
  return hash.digest("hex").substring(0, 6);
}

function groupNameByIndex(index: number) {
  const groupPrefix = "test-bot-group";
  const hash = sha256(`${groupPrefix}-${index}`);
  return `${groupPrefix}-${hash}`;
}

test("Create and delete group", async ({ page }) => {
  await test.step("add group", async () => {
    // enable admin mode
    await page.getByRole("switch", { name: "Admin Mode" }).click();

    await page.goto("./groups");
    await page.getByTestId("add-group").click();
    // use hashes in order to have an exact 1 match from the search bar
    const groupName = groupNameByIndex(test.info().workerIndex);
    const modal = page.getByTestId("modal");
    await modal.locator("input[type=text]").fill(groupName);
    await modal.locator("button[type=submit]").click();
    const toast = page.getByTestId("toast");
    await expect(toast).toBeVisible();
    await expect(toast.getByText("Group created")).toBeVisible();
    // check group has been created
    await page.goto("./groups");
    await page.getByTestId("search-group").pressSequentially(groupName);
    const options = page.getByTitle("More");
    await expect(options).toHaveCount(1);
  });

  await test.step("delete group", async () => {
    await page.goto("./groups");
    // expect to find only one group
    const groupName = groupNameByIndex(test.info().workerIndex);
    await page
      .getByTestId("search-group")
      .pressSequentially(groupName, { delay: 100 });
    const options = page.getByTitle("More");
    await expect(options).toHaveCount(1);
    // click delete option and confirm
    await options.click();
    const deleteOption = page.getByTestId("delete-group-opt");
    await expect(deleteOption).toBeVisible();
    await deleteOption.click();
    await page.getByRole("button", { name: "Delete group" }).click();
    const toast = page.getByTestId("toast");
    await expect(toast).toBeVisible();
    await expect(toast.getByText("Group deleted")).toBeVisible();
    // check group has been deleted
    await page.getByTitle("Clear search").click();
    await page
      .getByTestId("search-group")
      .pressSequentially(groupName, { delay: 100 });
    await expect(page.getByTitle("More")).toHaveCount(0);
    expect(page.getByText("No group found.").isVisible());
  });
});
