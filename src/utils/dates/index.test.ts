import "./index";

test("To Human", () => {
  let d = new Date();
  expect(d.toHuman()).toBe("Today");

  d = new Date("2020-01-01");
  expect(d.toHuman()).toBe("Long time ago...");
});
