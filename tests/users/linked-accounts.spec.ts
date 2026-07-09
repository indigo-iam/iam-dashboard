// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Page } from "@playwright/test";
import {
  test,
  login,
  TEST_USER,
  ADMIN_USER,
  enableAdminMode,
  expect,
  logout,
} from "../auth/fixture";
import { changeTabPanel, dismissToast } from "../utils";
import fs from "fs";

async function openLinkCertificateDialog(page: Page) {
  const dialog = page.getByRole("dialog").filter({ visible: true });
  const linkCertificateButton = page.getByRole("button", {
    name: "Link certificate",
  });
  await expect(linkCertificateButton).toBeEnabled();
  await linkCertificateButton.click();
  const heading = dialog.getByRole("heading");
  await expect(heading).toHaveText("Link certificate");
  await expect(heading).toBeVisible();
  return dialog;
}

async function openLinkProxyDialog(page: Page) {
  const dialog = page.getByRole("dialog").filter({ visible: true });
  const linkProxyButton = page.getByRole("button", {
    name: "Link proxy certificate",
  });
  await expect(linkProxyButton).toBeEnabled();
  await linkProxyButton.click();
  const heading = dialog.getByRole("heading");
  await expect(heading).toHaveText("Link proxy certificate");
  await expect(heading).toBeVisible();
  return dialog;
}

async function linkCertificate(page: Page) {
  const pem = fs.readFileSync("assets/trust/test0.cert.pem").toString();
  const dialog = await openLinkCertificateDialog(page);
  const label = dialog.getByLabel("Label");
  await label.fill("test-cert");
  const textarea = dialog.getByLabel("Certificate");
  await textarea.fill(pem);
  const confirm = dialog.getByRole("button", { name: "Confirm" });
  await expect(confirm).toBeEnabled();
  await confirm.click();
  return dialog;
}

async function linkProxyCertificate(page: Page) {
  const pem = fs.readFileSync("assets/trust/proxy.d/0.pem").toString();
  const dialog = await openLinkProxyDialog(page);
  const textarea = dialog.getByLabel("Proxy certificate");
  await expect(textarea).toHaveAttribute("required");
  await textarea.fill(pem);
  const confirm = dialog.getByRole("button", { name: "Confirm" });
  await expect(confirm).toBeEnabled();
  await confirm.click();
  return dialog;
}

async function unlinkCertificate(page: Page) {
  const x509 = page.locator(".panel").filter({ hasText: "X.509 certificates" });
  const certs = x509.locator(".iam-list-item").filter({ hasText: "test-cert" });
  const options = certs.getByRole("button", { name: "More" });
  await options.click();

  const unlinkBtn = page.getByRole("button", {
    name: "Unlink certificate",
  });
  await expect(unlinkBtn).toBeEnabled();
  await unlinkBtn.click();
  const dialog = page.getByRole("dialog").filter({ visible: true });
  const heading = dialog.getByRole("heading").first();
  await expect(heading).toHaveText("Unlink X.509 certificate?");
  const confirm = dialog.getByRole("button", { name: "Confirm" });
  await expect(confirm).toBeEnabled();
  await confirm.click();
  return dialog;
}

test.afterEach(async ({ page }) => {
  await logout(page);
});

test("admin can link certificate and proxy on themselves", async ({ page }) => {
  await login(page, ADMIN_USER);
  const linkedAccountsBtn = page.getByText("LINKED ACCOUNTS");
  await linkedAccountsBtn.scrollIntoViewIfNeeded();
  await changeTabPanel(linkedAccountsBtn);

  const x509 = page.locator(".panel").filter({ hasText: "X.509 certificates" });
  await expect(x509).toBeVisible();

  const linkProxyButton = page.getByRole("button", {
    name: "Link proxy certificate",
  });
  const linkCertificateButton = page.getByRole("button", {
    name: "Link certificate",
  });

  await test.step("'Link proxy certificate' button is visible", async () => {
    await expect(linkProxyButton).toBeVisible();
  });

  await test.step("'Link certificate' button is not visible", async () => {
    await expect(linkCertificateButton).toBeHidden();
  });

  await test.step("enable admin mode", async () => {
    await enableAdminMode(page);
  });

  await test.step("'Link proxy certificate' button is visible", async () => {
    await expect(linkProxyButton).toBeVisible();
    await expect(linkProxyButton).toBeEnabled();
  });

  await test.step("'Link certificate' button is visible visible", async () => {
    await expect(linkCertificateButton).toBeVisible();
    await expect(linkCertificateButton).toBeEnabled();
  });

  await test.step("add valid certificate", async () => {
    const dialog = await linkCertificate(page);
    await expect(dialog).toBeHidden();
    await dismissToast(page, "Certificated linked to account", "success");
    const cert = x509.locator(".iam-list-item").last();
    await expect(cert).toHaveText(
      "test-certSubject CN=test,O=IGI,C=ITIssuer CN=Test CA,O=INFN,C=IT"
    );
  });

  await test.step("link valid proxy certificate", async () => {
    const dialog = await linkProxyCertificate(page);
    await expect(dialog).toBeHidden();
    await dismissToast(
      page,
      "Proxy certificate successfully linked",
      "success"
    );
    const cert = x509.locator(".iam-list-item").last();
    await expect(cert).toHaveText(
      /^test-certSubject CN=test,O=IGI,C=ITIssuer CN=Test CA,O=INFN,C=ITHas proxy certificate. Proxy expires in \d days{0,1}.$/
    );
  });

  await test.step("unlink their own certificate", async () => {
    const dialog = await unlinkCertificate(page);
    await expect(dialog).toBeHidden();
  });
});

test.describe("admin assigns certificate to user and user self-assign proxy", () => {
  test("user cannot add proxy without a valid certificate", async ({
    page,
  }) => {
    const x509 = page
      .locator(".panel")
      .filter({ hasText: "X.509 certificates" });

    await test.step("login as test user", async () => {
      await login(page, TEST_USER);
    });

    await test.step("switch to linked account tab", async () => {
      const linkedAccountsBtn = page.getByText("LINKED ACCOUNTS");
      await linkedAccountsBtn.scrollIntoViewIfNeeded();
      await changeTabPanel(linkedAccountsBtn);
    });

    await test.step("cannot add proxy because there are no certificates", async () => {
      await expect(x509.getByRole("paragraph")).toHaveText(
        "There are not linked certificates."
      );
      const dialog = await openLinkProxyDialog(page);
      const text =
        "This account has no linked X.509 certificate to be associated to a proxy certificate. Please add a personal certificate to your Indigo IAM account or contact your administrator for help.";
      await expect(dialog.getByRole("paragraph")).toHaveText(text);
      const cancel = dialog.getByRole("button", { name: "Cancel" });
      await cancel.click();
      await expect(dialog).toBeHidden();
    });
  });

  test("admin can assign certificate to user", async ({ page }) => {
    await test.step("login as admin user", async () => {
      await login(page, ADMIN_USER);
    });

    await test.step("enable admin mode", async () => {
      await enableAdminMode(page);
    });

    await test.step("navigate to Test User page", async () => {
      await page.goto("./users");
      const newUserBtn = page.getByRole("button", { name: "New user" });
      await expect(newUserBtn).toBeEnabled(); // wait for page fully loaded
      const searchbar = page.getByPlaceholder("Type to search a user");
      await searchbar.pressSequentially("test user");
      const testUser = page.getByRole("link").filter({ hasText: "Test User" });
      const users = page.locator(".iam-list-item").filter({ visible: true });
      await expect(users).toHaveCount(1);
      await expect(users).toBeEnabled();
      await testUser.click();
      const heading = page
        .getByRole("heading")
        .filter({ hasText: "Test User" });
      await expect(heading).toBeVisible();
      const saveBtn = page.getByRole("button", { name: "Save changes" });
      await expect(saveBtn).toBeEnabled();
      const email = page.getByLabel("Email");
      await expect(email).toHaveValue("test@iam.test");
    });

    await test.step("select linked account tab", async () => {
      const linkedAccountsBtn = page.getByText("LINKED ACCOUNTS");
      await linkedAccountsBtn.scrollIntoViewIfNeeded();
      await changeTabPanel(linkedAccountsBtn);
    });

    await test.step("link cert to user", async () => {
      const dialog = await linkCertificate(page);
      await expect(dialog).toBeHidden();
      await dismissToast(page, "Certificated linked to account", "success");
    });
  });

  test("user can assign to themselves a proxy certificate", async ({
    page,
  }) => {
    await test.step("login as test user", async () => {
      await login(page, TEST_USER);
    });

    await test.step("switch to linked account tab", async () => {
      const linkedAccountsBtn = page.getByText("LINKED ACCOUNTS");
      await linkedAccountsBtn.scrollIntoViewIfNeeded();
      await changeTabPanel(linkedAccountsBtn);
    });

    await test.step("user can link a proxy", async () => {
      const dialog = await openLinkProxyDialog(page);
      const confirmButton = dialog.getByRole("button", { name: "Confirm" });
      const cancelButton = dialog.getByRole("button", { name: "Cancel" });
      await expect(confirmButton).toBeEnabled();
      await cancelButton.click();
      await expect(dialog).toBeHidden();
    });

    await test.step("user cannot link a bad formed proxy", async () => {
      const dialog = await openLinkProxyDialog(page);
      const textarea = dialog.getByLabel("Proxy certificate");
      await expect(textarea).toBeVisible();
      await textarea.fill("foobazbar");
      const confirmButton = dialog.getByRole("button", { name: "Confirm" });
      await expect(confirmButton).toBeEnabled();
      await confirmButton.click();
      await expect(dialog).toBeVisible();
      const error = dialog.getByRole("paragraph");
      await expect(error).toHaveText(
        "Error reading proxy certificate from string: Private key was not found in the PEM keystore (0 certificate(s) was (were) found)."
      );
      const cancelButton = dialog.getByRole("button", { name: "Cancel" });
      await expect(cancelButton).toBeEnabled();
      await cancelButton.click();
      await expect(dialog).toBeHidden();
    });
  });

  test("user can unlink the certificate and its proxy", async ({ page }) => {
    await test.step("login as test user", async () => {
      await login(page, TEST_USER);
    });

    await test.step("select linked account tab", async () => {
      const linkedAccountsBtn = page.getByText("LINKED ACCOUNTS");
      await linkedAccountsBtn.scrollIntoViewIfNeeded();
      await changeTabPanel(linkedAccountsBtn);
    });

    await test.step("unlink certificate", async () => {
      await unlinkCertificate(page);
    });
  });
});
