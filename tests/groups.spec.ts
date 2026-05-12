import { testAdmin, expect, enableAdminMode, testUser } from "./auth.fixture";
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

testAdmin("Admin can create and delete a group", async ({ signedUpPage }) => {
  await testAdmin.step("create group", async () => {
    const page = signedUpPage;
    await page.goto("./groups");
    await expect(
      page.getByRole("heading", { name: "My Groups" })
    ).toBeVisible();
    await enableAdminMode(page);
    const heading = page.getByRole("heading", { name: "Groups" });
    await expect(heading).toBeVisible();
    await page.getByRole("button", { name: "New group" }).click();
    await expect(page.getByText("Create new group")).toBeVisible();
    // use hashes in order to have an exact 1 match from the search bar
    const groupName = groupNameByIndex(testAdmin.info().workerIndex);
    await page.getByLabel("Group name").fill(groupName);
    await page.getByRole("button", { name: "Add group" }).click();
    const toast = page.getByTestId("toast").first();
    await expect(toast.getByText("Group created")).toBeVisible();
    await toast.getByTitle("Close").click();
    // check group has been created
    await page.goto("./groups");
    await page
      .getByTestId("search-group")
      .pressSequentially(groupName, { delay: 30 });
    const options = page.getByTitle("More");
    await expect(options).toHaveCount(1);
  });

  await testAdmin.step("delete group", async () => {
    const page = signedUpPage;
    await page.goto("./groups");
    const heading = page.getByRole("heading", { name: "Groups" });
    await expect(heading).toBeVisible();
    // expect to find only one group
    const groupName = groupNameByIndex(testAdmin.info().workerIndex);
    await page
      .getByTestId("search-group")
      .pressSequentially(groupName, { delay: 30 });
    const options = page.getByTitle("More");
    await expect(options).toHaveCount(1);
    // click delete option and confirm
    await options.click();
    const deleteOption = page.getByTestId("delete-group-opt");
    await expect(deleteOption).toBeVisible();
    await deleteOption.click();
    await page.getByRole("button", { name: "Delete" }).click();
    const toast = page.getByTestId("toast").first();
    await expect(toast).toBeVisible();
    await expect(toast.getByText("Group deleted")).toBeVisible();
    await toast.getByTitle("Close").click();
    // check group has been deleted
    await page.getByTitle("Clear search").click();
    await page
      .getByTestId("search-group")
      .pressSequentially(groupName, { delay: 30 });
    await expect(page.getByTitle("More")).toHaveCount(0);
    expect(page.getByText("No group found.").isVisible());
  });
});

testUser("User cannot create nor delete a group", async ({ signedUpPage }) => {
  const page = signedUpPage;
  await page.goto("./groups");

  testUser.step("'New group' button is not visible", async () => {
    await page.waitForURL("./groups");
    await expect(page.getByRole("button", { name: "New group" })).toBeHidden();
  });

  testUser.step("'Join group' button is visible", async () => {
    await page.waitForURL("./groups");
    await expect(
      page.getByRole("button", { name: "Join group" })
    ).toBeVisible();
  });
});

testUser("User cannot see others client", async ({ signedUpPage }) => {
  const page = signedUpPage;
  await page.goto("./groups/c617d586-54e6-411d-8e38-649677980001");
  await page.waitForURL("./groups");
  const heading = page.getByRole("heading", { name: "My groups" });
  await expect(heading).toBeVisible();
});
