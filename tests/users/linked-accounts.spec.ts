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
import { changeTabPanel, dismissToast, navigateToTestUserPage } from "../utils";
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
  const panelHeading = page.getByRole("heading", {
    name: "X.509 certificates",
  });
  await expect(panelHeading).toBeVisible();
  const x509 = panelHeading.locator("../..");
  const certs = x509.getByRole("listitem").filter({ hasText: "test-cert" });
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

async function selectLinkedAccountTab(page: Page) {
  await changeTabPanel(page, "LINKED ACCOUNTS");
}

test.afterEach(async ({ page }) => {
  await logout(page);
});

test("user cannot link oidc account", async ({ page }) => {
  await test.step("login", async () => {
    await login(page, TEST_USER);
    await selectLinkedAccountTab(page);
  });

  const panelHeading = page.getByRole("heading", {
    name: "OpenID Connect/OAuth2",
  });
  await expect(panelHeading).toBeVisible();
  const oidc = panelHeading.locator("../..");
  await expect(oidc).toBeVisible();

  await test.step("link account button is hidden", async () => {
    const button = oidc.getByRole("button", { name: "Link account" });
    await expect(button).toBeHidden();
  });
});

test("admin can link certificate and proxy on themselves", async ({ page }) => {
  await login(page, ADMIN_USER);
  await selectLinkedAccountTab(page);

  const panelHeading = page.getByRole("heading", {
    name: "X.509 certificates",
  });
  await expect(panelHeading).toBeVisible();
  const x509 = panelHeading.locator("../..");
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

  await test.step("'Link certificate' button is visible", async () => {
    await expect(linkCertificateButton).toBeVisible();
    await expect(linkCertificateButton).toBeEnabled();
  });

  await test.step("add valid certificate", async () => {
    const dialog = await linkCertificate(page);
    await expect(dialog).toBeHidden();
    await dismissToast(page, "Certificated linked to account", "success");
    await expect(x509).toBeVisible();
    const certs = x509.getByRole("listitem");
    await expect(certs).toHaveCount(2);
    const cert = certs.last().getByRole("paragraph");
    await expect(cert).toHaveText([
      "test-cert",
      "Subject CN=test,O=IGI,C=IT",
      "Issuer CN=Test CA,O=INFN,C=IT",
    ]);
  });

  await test.step("link valid proxy certificate", async () => {
    const dialog = await linkProxyCertificate(page);
    await expect(dialog).toBeHidden();
    await dismissToast(
      page,
      "Proxy certificate successfully linked",
      "success"
    );
    const cert = x509.getByRole("listitem").last().getByRole("paragraph");
    await expect(cert).toHaveText([
      "test-cert",
      "Subject CN=test,O=IGI,C=IT",
      "Issuer CN=Test CA,O=INFN,C=IT",
      /Has proxy certificate. Proxy expires in \d days{0,1}.$/,
    ]);
  });

  await test.step("unlink their own certificate", async () => {
    const dialog = await unlinkCertificate(page);
    await expect(dialog).toBeHidden();
  });
});

test.describe("admin assigns certificate to user and user self-assigns proxy", () => {
  test("user cannot add proxy without a valid certificate", async ({
    page,
  }) => {
    const panelHeading = page.getByRole("heading", {
      name: "X.509 certificates",
    });
    const x509 = panelHeading.locator("..");

    await test.step("login as test user", async () => {
      await login(page, TEST_USER);
    });

    await test.step("switch to linked account tab", async () => {
      await changeTabPanel(page, "LINKED ACCOUNTS");
    });

    await test.step("cannot add proxy because there are no certificates", async () => {
      await expect(x509).toBeVisible();
      await expect(x509.getByRole("paragraph")).toHaveText(
        "Ask to your organization administrator to link a X.509 certificate to your account."
      );
      await expect(
        page.getByRole("button", {
          name: "Link proxy certificate",
        })
      ).toBeHidden();
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
      await navigateToTestUserPage(page, "Test User");
      const saveBtn = page.getByRole("button", { name: "Save changes" });
      await expect(saveBtn).toBeEnabled();
      const email = page.getByLabel("Email");
      await expect(email).toHaveValue("test@iam.test");
    });

    await test.step("select linked account tab", async () => {
      await changeTabPanel(page, "LINKED ACCOUNTS");
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
      await changeTabPanel(page, "LINKED ACCOUNTS");
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
      await changeTabPanel(page, "LINKED ACCOUNTS");
    });

    await test.step("unlink certificate", async () => {
      await unlinkCertificate(page);
    });
  });
});
