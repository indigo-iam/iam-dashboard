// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Locator, Page } from "@playwright/test";
import { testAdmin as test, expect, enableAdminMode } from "../auth/fixture";
import { dismissToast } from "../utils";

test.beforeEach("open new policy", async ({ signedUpPage }) => {
  const page = signedUpPage;
  await enableAdminMode(page);
  await page.goto("./policies");
  const title = page.getByRole("heading", { name: "Scope Policies" });
  await expect(title).toBeVisible();

  const policies = page.getByRole("listitem");
  const count = await policies.count();
  const defaultPolicy = count > 1 ? policies.first() : policies;
  await expect(defaultPolicy).toHaveText("Default Permit ALL policy", {
    useInnerText: true,
  });
  const newPolicyBtn = page.getByRole("button", { name: "New policy" });
  await expect(newPolicyBtn).toBeEnabled();
  await newPolicyBtn.click();
  await page.waitForURL("./policies/new");
});

test.afterEach("delete policy", async ({ signedUpPage }, testInfo) => {
  const page = signedUpPage;
  await page.goto("./policies");
  const policyName = `scope-policy-${testInfo.testId}`;
  await navigateToPolicy(page, policyName);
  await expect(page.getByLabel("Policy name")).toHaveValue(policyName);
  const deleteBtn = page.getByRole("button", { name: "Delete" });
  await expect(deleteBtn).toBeEnabled();
  await deleteBtn.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading").first()).toHaveText("Delete policy");
  const confirmBtn = dialog.getByRole("button", { name: "Delete" });
  await expect(confirmBtn).toBeEnabled();
  await confirmBtn.click();
  await expect(dialog).toBeHidden();
  await dismissToast(page, "Scope policy deleted", "success");
  await page.waitForURL("./policies");
});

async function selectTarget(
  page: Page,
  label: string,
  target: "USER" | "GROUP" | "ALL"
) {
  const searchUser = page.getByLabel(label);
  await expect(searchUser).toBeHidden();
  const select = page.getByLabel("Target");
  await expect(select).toBeEnabled();
  await select.selectOption(target);
  await expect(searchUser).toBeVisible();
  const addBtn = page.getByRole("button", { name: "Add Scope Policy" });
  await expect(addBtn).toBeDisabled();
  await searchUser.pressSequentially("test", { delay: 250 });
  await expect(addBtn).toBeEnabled();
}

async function navigateToPolicy(page: Page, policyName: string) {
  const href = page.getByRole("link", { name: policyName });
  await expect(href).toBeVisible();
  await href.click();
  await page.waitForURL("./policies/*");
}

async function savePolicy(page: Page) {
  const addBtn = page.getByRole("button", { name: "Add Scope Policy" });
  await expect(addBtn).toBeEnabled();
  await addBtn.click();
  const dialog = page.getByRole("dialog");
  const heading = dialog.getByRole("heading");
  await expect(heading).toHaveText("Create Scope Policy");
  const confirmBtn = page.getByRole("button", { name: "Confirm" });
  await confirmBtn.click();
  await expect(dialog).toBeHidden();
  await dismissToast(page, "Scope policy created", "success");
}

async function elementIsValid(element: Locator) {
  return await element.evaluate((el: HTMLInputElement) => el.checkValidity());
}

test("simple policy", async ({ signedUpPage }, testInfo) => {
  const page = signedUpPage;
  const addBtn = page.getByRole("button", { name: "Add Scope Policy" });
  await expect(addBtn).toBeDisabled();
  const policyName = `scope-policy-${testInfo.testId}`;
  const policyNameInput = page.getByLabel("Policy name");
  await policyNameInput.fill(policyName);
  await expect(addBtn).toBeEnabled();
  const scopeMatchers = page.getByLabel("Scope matchers");
  await scopeMatchers.fill("phone");
  const addScopeMatcherBtn = page.getByRole("button", {
    name: "Add",
    exact: true,
  });
  await expect(addScopeMatcherBtn).toBeEnabled();
  await addScopeMatcherBtn.click();
  await expect(page.locator("[value='phone']")).toBeVisible();
  await savePolicy(page);
});

test("regexp policy", async ({ signedUpPage }, testInfo) => {
  const page = signedUpPage;
  const policyName = `scope-policy-${testInfo.testId}`;
  const policyNameInput = page.getByLabel("Policy name");
  await policyNameInput.fill(policyName);
  const scopeMatchers = page.getByLabel("Scope matchers");

  await test.step("at least one scope matcher is required", async () => {
    await expect(scopeMatchers).not.toHaveAttribute("required");
    await page.getByLabel("Matching policy").selectOption("REGEXP");
    await expect(scopeMatchers).toHaveAttribute("required");
    const isValid = await elementIsValid(scopeMatchers);
    expect(isValid).toBe(false);
  });

  await test.step("add scope matchers", async () => {
    const addScopeMatcherBtn = page.getByRole("button", {
      name: "Add",
      exact: true,
    });
    const scopeMatchers = page.getByLabel("Scope matchers");
    await scopeMatchers.fill("^wlcg\.groups:/cms/.*$");
    await addScopeMatcherBtn.click();
    const isValid = await elementIsValid(scopeMatchers);
    expect(isValid).toBe(true);
    await scopeMatchers.fill("^wlcg\.groups:/atlas/.*$");
    await addScopeMatcherBtn.click();
  });

  await test.step("select user target", async () => {
    await selectTarget(page, "Search user", "USER");
  });

  await test.step("save policy", async () => {
    await savePolicy(page);
  });

  await test.step("verify policy", async () => {
    const page = signedUpPage;
    const policyName = `scope-policy-${testInfo.testId}`;
    navigateToPolicy(page, policyName);
    await expect(page.getByLabel("Rule")).toHaveValue("DENY");
    await expect(page.getByLabel("Matching policy")).toHaveValue("REGEXP");
    await expect(
      page.locator("[value='^wlcg\.groups:/cms/.*$']")
    ).toBeVisible();
    await expect(
      page.locator("[value='^wlcg\.groups:/atlas/.*$']")
    ).toBeVisible();
  });
});

test("path policy", async ({ signedUpPage }, testInfo) => {
  const page = signedUpPage;
  const policyName = `scope-policy-${testInfo.testId}`;
  const policyNameInput = page.getByLabel("Policy name");
  await policyNameInput.fill(policyName);
  const scopeMatchers = page.getByLabel("Scope matchers");

  await test.step("change rule to PERMIT", async () => {
    await page.getByLabel("Rule").selectOption("PERMIT");
  });

  await test.step("at least one scope matcher is required", async () => {
    await expect(scopeMatchers).not.toHaveAttribute("required");
    await page.getByLabel("Matching policy").selectOption("PATH");
    await expect(scopeMatchers).toHaveAttribute("required");
    const isValid = await elementIsValid(scopeMatchers);
    expect(isValid).toBe(false);
  });

  await test.step("add scope matchers", async () => {
    const addScopeMatcherBtn = page.getByRole("button", {
      name: "Add",
      exact: true,
    });
    const scopeMatchers = page.getByLabel("Scope matchers");
    await scopeMatchers.fill("storage.read:/cms");
    await addScopeMatcherBtn.click();
    const isValid = await elementIsValid(scopeMatchers);
    expect(isValid).toBe(true);
    await scopeMatchers.fill("storage.read:/atlas/storage-area");
    await addScopeMatcherBtn.click();
  });

  await test.step("select group target", async () => {
    const searchUser = page.getByLabel("Search group");
    await expect(searchUser).toBeHidden();
    const target = page.getByLabel("Target");
    await expect(target).toBeEnabled();
    await target.selectOption("GROUP");
    await expect(searchUser).toBeVisible();
    const addBtn = page.getByRole("button", { name: "Add Scope Policy" });
    await expect(addBtn).toBeDisabled();
    await searchUser.pressSequentially("Test-001", { delay: 250 });
    await expect(addBtn).toBeEnabled();
  });

  await test.step("save policy", async () => {
    await savePolicy(page);
  });

  await test.step("verify policy", async () => {
    const page = signedUpPage;
    const policyName = `scope-policy-${testInfo.testId}`;
    await navigateToPolicy(page, policyName);
    await expect(page.getByLabel("Rule")).toHaveValue("PERMIT");
    await expect(page.getByLabel("Matching policy")).toHaveValue("PATH");
    await expect(page.locator("[value='storage.read:/cms']")).toBeVisible();
    await expect(
      page.locator("[value='storage.read:/atlas/storage-area']")
    ).toBeVisible();
  });
});
