import {
  testAdmin,
  expect,
  enableAdminMode,
  disableAdminMode,
  testUser,
} from "./auth.fixture";

testAdmin("Admin can enable admin mode", async ({ signedUpPage }) => {
  await testAdmin.step("login", async () => {
    await signedUpPage.goto("./");
    await expect(signedUpPage.getByLabel("Username")).toHaveValue("admin");
  });

  await testAdmin.step("enable admin mode", async () => {
    await enableAdminMode(signedUpPage);
  });

  await testAdmin.step("disable admin mode", async () => {
    await disableAdminMode(signedUpPage);
  });
});

testUser("User cannot enable admin mode", async ({ signedUpPage }) => {
  await testUser.step("login", async () => {
    await signedUpPage.goto("./");
    await expect(signedUpPage.getByLabel("Username")).toHaveValue("test");
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
