import {
  testAdmin,
  expect,
  enableAdminMode,
  disableAdminMode,
  testUser,
} from "./fixture";

/*
 * Administrator
 */

testAdmin(
  "Admin cannot see privileged pages in user mode",
  async ({ signedUpPage }) => {
    const page = signedUpPage;

    await testAdmin.step("navbar has exactly five buttons", async () => {
      await page.goto("./");
      await page.waitForURL("./users/me");
      const navbar = page.getByRole("navigation");
      const navigationButtons = navbar.getByRole("button");
      expect(navigationButtons).toHaveCount(5);
    });

    await testAdmin.step("'/users' redirects to '/users/me'", async () => {
      await page.goto("./users");
      await page.waitForURL("./users/me");
    });

    await testAdmin.step("'/groups' shows owned groups", async () => {
      await page.goto("./groups");
      await page.waitForURL("./groups");
      const heading = page.getByRole("heading", { name: "My groups" });
      await expect(heading).toBeVisible();
    });

    await testAdmin.step("'/clients' shows owned clients", async () => {
      await page.goto("./clients");
      await page.waitForURL("./clients");
      const heading = page.getByRole("heading", { name: "My clients" });
      await expect(heading).toBeVisible();
    });

    await testAdmin.step("'/requests' redirects to '/users/me'", async () => {
      await page.goto("./requests");
      await page.waitForURL("./users/me");
    });

    await testAdmin.step("'/scopes' redirects to '/users/me'", async () => {
      await page.goto("./scopes");
      await page.waitForURL("./users/me");
    });

    await testAdmin.step("'/aup' redirects to '/users/me'", async () => {
      await page.goto("./aup");
      await page.waitForURL("./users/me");
    });

    await testAdmin.step("'/policies' redirects to '/users/me'", async () => {
      await page.goto("./policies");
      await page.waitForURL("./users/me");
    });
  }
);

testAdmin(
  "Admin can see privileged pages in admin mode",
  async ({ signedUpPage }) => {
    const page = signedUpPage;

    await testAdmin.step("login", async () => {
      await page.goto("./");
      await expect(
        page.getByLabel("Username").locator("visible=true")
      ).toHaveValue("admin");
    });

    await testAdmin.step("enable admin mode", async () => {
      await enableAdminMode(page);
    });

    await testAdmin.step("navbar has exactly ten buttons", async () => {
      await page.goto("./");
      await page.waitForURL("./users/me");
      const navbar = page.getByRole("navigation");
      const navigationButtons = navbar.getByRole("button");
      expect(navigationButtons).toHaveCount(10);
    });

    await testAdmin.step("'/users' page is visible", async () => {
      await page.goto("./users");
      await page.waitForURL("./users");
      const heading = page.getByRole("heading", { name: "Users" });
      await expect(heading).toBeVisible();
    });

    await testAdmin.step("'/groups' shows all groups", async () => {
      await page.goto("./groups");
      await page.waitForURL("./groups");
      const heading = page.getByRole("heading", { name: "Groups" });
      await expect(heading).toBeVisible();
    });

    await testAdmin.step("'/clients' shows all clients", async () => {
      await page.goto("./clients");
      await page.waitForURL("./clients");
      const heading = page.getByRole("heading", { name: "Clients" });
      await expect(heading).toBeVisible();
    });

    await testAdmin.step("'/requests' page is visible", async () => {
      await page.goto("./requests");
      await page.waitForURL("./requests");
      const heading = page.getByRole("heading", { name: "Requests" });
      await expect(heading).toBeVisible();
    });

    await testAdmin.step("'/scopes' page is visible", async () => {
      await page.goto("./scopes");
      await page.waitForURL("./scopes");
      const heading = page.getByRole("heading", { name: "Scopes" });
      await expect(heading).toBeVisible();
    });

    await testAdmin.step("'/policies' page is visible", async () => {
      await page.goto("./policies");
      await page.waitForURL("./policies");
      const heading = page.getByRole("heading", { name: "Policies" });
      await expect(heading).toBeVisible();
    });

    await testAdmin.step("'/aup' page is visible", async () => {
      await page.goto("./aup");
      await page.waitForURL("./aup");
      const heading = page.getByRole("heading", {
        name: "Acceptable Usage Policy",
      });
      await expect(heading).toBeVisible();
    });

    await testAdmin.step("disable admin mode", async () => {
      await disableAdminMode(signedUpPage);
    });
  }
);

/*
 * Regular user
 */

testUser("User cannot see privileged pages", async ({ signedUpPage }) => {
  const page = signedUpPage;

  await testUser.step("navbar has exactly five buttons", async () => {
    await page.goto("./");
    await page.waitForURL("./users/me");
    const navbar = page.getByRole("navigation");
    const navigationButtons = navbar.getByRole("button");
    expect(navigationButtons).toHaveCount(5);
  });

  await testUser.step("'/users' redirects to '/users/me'", async () => {
    await page.goto("./users");
    await page.waitForURL("./users/me");
  });

  await testUser.step("'/groups' shows owned groups", async () => {
    await page.goto("./groups");
    await page.waitForURL("./groups");
    const heading = page.getByRole("heading", { name: "My groups" });
    await expect(heading).toBeVisible();
  });

  await testUser.step("'/clients' shows owned clients", async () => {
    await page.goto("./clients");
    await page.waitForURL("./clients");
    const heading = page.getByRole("heading", { name: "My clients" });
    await expect(heading).toBeVisible();
  });

  await testUser.step("'/requests' redirects to '/users/me'", async () => {
    await page.goto("./requests");
    await page.waitForURL("./users/me");
  });

  await testUser.step("'/scopes' redirects to '/users/me'", async () => {
    await page.goto("./scopes");
    await page.waitForURL("./users/me");
  });

  await testUser.step("'/policies' redirects to '/users/me'", async () => {
    await page.goto("./policies");
    await page.waitForURL("./users/me");
  });

  await testUser.step("'/aup' redirects to '/users/me'", async () => {
    await page.goto("./aup");
    await page.waitForURL("./users/me");
  });
});

testUser("User cannot enable admin mode", async ({ signedUpPage }) => {
  await testUser.step("login", async () => {
    await signedUpPage.goto("./");
    await expect(
      signedUpPage.getByLabel("Username").locator("visible=true")
    ).toHaveValue("test");
  });

  await testUser.step("try enabling admin mode", async () => {
    const userMenuBtn = signedUpPage.getByTestId("user-menu-btn");
    await expect(userMenuBtn).toBeVisible();
    await userMenuBtn.click();
    const userMenu = signedUpPage.getByTestId("user-menu");
    await expect(userMenu).toBeVisible();
    await expect(
      userMenu.getByRole("button", { name: "Admin mode" })
    ).toBeHidden();
    await userMenuBtn.click();
    await expect(userMenu).toBeHidden();
  });
});
