// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { testAdmin as test, expect, enableAdminMode } from "../auth/fixture";
import { dismissToast } from "../utils";

test.beforeEach(async ({ signedUpPage }) => {
  console.log(`Running ${test.info().title}`);
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
});

test.afterEach(async ({ signedUpPage }, testInfo) => {
  const page = signedUpPage;
  const policyName = `scope-policy-${testInfo.testId}`;
  const href = page.getByRole("link", { name: policyName });
  await expect(href).toBeVisible();
  await href.click();
  await page.waitForURL("./policies/*");
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
});

test("Create policy", async ({ signedUpPage }, testInfo) => {
  const page = signedUpPage;
  const newPolicyBtn = page.getByRole("button", { name: "New policy" });
  await expect(newPolicyBtn).toBeEnabled();
  await newPolicyBtn.click();
  await page.waitForURL("./policies/new");
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
  await addBtn.click();
  const dialog = page.getByRole("dialog");
  const heading = dialog.getByRole("heading");
  await expect(heading).toHaveText("Create Scope Policy");
  await expect(dialog)
    .toHaveText(`Create Scope PolicyAre you sure you want to add this scope policy?Description: ${policyName}Rule: DENYMatching Policy: EQTarget: accounts and groupsScopes: phoneCancelConfirm
`);
  page.getByRole("textbox");
  const confirmBtn = page.getByRole("button", { name: "Confirm" });
  await confirmBtn.click();
  await expect(dialog).toBeHidden();
  await dismissToast(page, "Scope policy created", "success");
});
